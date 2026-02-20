// src\middleware\downloadPermission.middleware.js
import pool from "../db/pool.js";

export async function canDownload(req, res, next) {
  const userId = req.user.id;
  const { datasetId } = req.params;

  try {
    // 1️⃣ Fetch dataset
    const datasetRes = await pool.query(
      `SELECT access_type, owner_id FROM datasets WHERE id = $1`,
      [datasetId],
    );

    if (datasetRes.rowCount === 0) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    const { access_type, owner_id } = datasetRes.rows[0];

    // 2️⃣ Owner can always download
    if (owner_id === userId) {
      return next();
    }

    // 3️⃣ Public dataset → free download
    if (access_type === "public") {
      return next();
    }

    // 4️⃣ Restricted → check payment
    const permRes = await pool.query(
      `SELECT 1
       FROM dataset_permissions
       WHERE dataset_id = $1
       AND user_id = $2
       AND status = 'approved'`,
      [datasetId, userId],
    );

    if (permRes.rowCount === 0) {
      return res.status(403).json({
        message: "Payment required to download this dataset",
      });
    }

    next();
  } catch (err) {
    console.error("❌ Download permission failed:", err);
    res.status(500).json({ message: "Permission check failed" });
  }
}
