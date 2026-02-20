// backend/src/services/razorpay.service.js
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createRazorpayOrder({ amount, currency, receipt }) {
  // ⚠️ amount MUST already be in paise
  // Controller converts INR → paise
  return razorpay.orders.create({
    amount, // ✅ DO NOT multiply again
    currency,
    receipt,
    payment_capture: 1,
  });
}
