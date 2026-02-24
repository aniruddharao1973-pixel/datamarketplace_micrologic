// backend/src/jobs/trustScore.job.js
import pool from "../db/pool.js";
import { recalculateTrustScore } from "../services/trustScore.service.js";

export async function runTrustScoreJob() {
  const res = await pool.query(
    `SELECT id FROM datasets WHERE is_deleted = false`,
  );

  for (const row of res.rows) {
    try {
      await recalculateTrustScore(row.id);
    } catch (err) {
      console.error("Trust score job failed for dataset", row.id, err);
    }
  }

  console.log("✅ Trust score job completed");
}
