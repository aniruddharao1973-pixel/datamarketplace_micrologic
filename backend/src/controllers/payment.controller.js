import crypto from "crypto";
import pool from "../db/pool.js";
import { createRazorpayOrder } from "../services/razorpay.service.js";

/**
 * POST /payments/create-order
 * body: { datasetId }
 */
export async function createOrder(req, res) {
  console.log("🔥 PAYMENT CONTROLLER VERSION = PRICE_INR");

  const userId = req.user.id;
  const { datasetId } = req.body;

  try {
    // 0️⃣ Basic validation
    if (!datasetId) {
      return res.status(400).json({ message: "datasetId is required" });
    }

    // 1️⃣ Fetch dataset price
    const datasetRes = await pool.query(
      `SELECT price_inr FROM datasets WHERE id = $1`,
      [datasetId]
    );

    if (datasetRes.rowCount === 0) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    const amount = datasetRes.rows[0].price_inr;

    if (amount === null || amount <= 0) {
      return res.status(400).json({ message: "Invalid dataset price" });
    }

    // 2️⃣ Prevent duplicate purchase
    const existingAccess = await pool.query(
      `SELECT 1 FROM dataset_permissions
       WHERE dataset_id = $1 AND user_id = $2`,
      [datasetId, userId]
    );

    if (existingAccess.rowCount > 0) {
      return res
        .status(409)
        .json({ message: "Dataset already purchased" });
    }

    // 3️⃣ Create local order
    const orderRes = await pool.query(
      `INSERT INTO orders (user_id, dataset_id, amount, status)
       VALUES ($1, $2, $3, 'created')
       RETURNING id`,
      [userId, datasetId, amount]
    );

    const orderId = orderRes.rows[0].id;

    // 4️⃣ Create Razorpay order (amount in paise)
    const razorpayOrder = await createRazorpayOrder({
      amount: amount * 100,
      currency: "INR",
      receipt: String(orderId),
    });

    // 5️⃣ Store Razorpay order id
    await pool.query(
      `UPDATE orders SET razorpay_order_id = $1 WHERE id = $2`,
      [razorpayOrder.id, orderId]
    );

    // 6️⃣ Respond to frontend
    res.json({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("❌ createOrder error:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
}

/**
 * POST /payments/verify
 * body:
 * {
 *   razorpay_order_id,
 *   razorpay_payment_id,
 *   razorpay_signature
 * }
 */
export async function verifyPayment(req, res) {
  const userId = req.user.id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  try {
    // 1️⃣ Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 2️⃣ Fetch order
    const orderRes = await pool.query(
      `SELECT id, dataset_id FROM orders WHERE razorpay_order_id = $1`,
      [razorpay_order_id]
    );

    if (orderRes.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { id: orderId, dataset_id } = orderRes.rows[0];

    // 3️⃣ Save payment
    await pool.query(
      `INSERT INTO payments
        (order_id, razorpay_payment_id, razorpay_signature, status, paid_at)
       VALUES ($1, $2, $3, 'success', now())`,
      [orderId, razorpay_payment_id, razorpay_signature]
    );

    // 4️⃣ Mark order paid
    await pool.query(
      `UPDATE orders SET status = 'paid' WHERE id = $1`,
      [orderId]
    );

    // 5️⃣ Grant dataset download access
    await pool.query(
      `INSERT INTO dataset_permissions
        (dataset_id, user_id, permission, status)
       VALUES ($1, $2, 'download', 'approved')
       ON CONFLICT DO NOTHING`,
      [dataset_id, userId]
    );

    res.json({ message: "Payment verified & access granted" });
  } catch (err) {
    console.error("❌ verifyPayment error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
}