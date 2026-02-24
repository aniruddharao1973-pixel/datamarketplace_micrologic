// backend/src/services/trustScore.service.js
import pool from "../db/pool.js";

export async function recalculateTrustScore(datasetId) {
  // ---------- Freshness (30) ----------
  const freshnessRes = await pool.query(
    `
    SELECT MAX(created_at) AS last_update
    FROM dataset_updates
    WHERE dataset_id = $1
    `,
    [datasetId],
  );

  let freshnessScore = 0;
  if (freshnessRes.rows[0].last_update) {
    const days =
      (Date.now() - new Date(freshnessRes.rows[0].last_update).getTime()) /
      (1000 * 60 * 60 * 24);

    if (days <= 7) freshnessScore = 30;
    else if (days <= 30) freshnessScore = 20;
    else if (days <= 90) freshnessScore = 10;
  }

  // ---------- Adoption (25) ----------
  const adoptionRes = await pool.query(
    `
    SELECT COUNT(*)::int AS purchases
    FROM dataset_purchases
    WHERE dataset_id = $1
    `,
    [datasetId],
  );

  const purchases = adoptionRes.rows[0].purchases;
  let adoptionScore = 0;
  if (purchases >= 10) adoptionScore = 25;
  else if (purchases >= 5) adoptionScore = 15;
  else if (purchases >= 1) adoptionScore = 8;

  // ---------- Reliability (25) ----------
  const reliabilityRes = await pool.query(
    `
    SELECT
      COUNT(*) FILTER (WHERE status = 'SUCCESS') AS success,
      COUNT(*) AS total
    FROM dataset_downloads
    WHERE dataset_id = $1
    `,
    [datasetId],
  );

  let reliabilityScore = 0;
  const { success, total } = reliabilityRes.rows[0];

  if (total > 0) {
    const rate = (success / total) * 100;
    if (rate >= 99) reliabilityScore = 25;
    else if (rate >= 95) reliabilityScore = 18;
    else if (rate >= 90) reliabilityScore = 10;
  }

  // ---------- Producer Activity (20) ----------
  const activityRes = await pool.query(
    `
    SELECT COUNT(*)::int AS updates
    FROM dataset_updates
    WHERE dataset_id = $1
      AND created_at >= now() - interval '30 days'
    `,
    [datasetId],
  );

  const activityScore = activityRes.rows[0].updates > 0 ? 20 : 0;

  // ---------- Final ----------
  const trustScore =
    freshnessScore + adoptionScore + reliabilityScore + activityScore;

  let trustLevel = "new";
  if (trustScore >= 70) trustLevel = "trusted";
  else if (trustScore >= 40) trustLevel = "stable";
  else if (total > 0 && reliabilityScore < 10) trustLevel = "degraded";

  await pool.query(
    `
    UPDATE datasets
    SET trust_score = $1,
        trust_level = $2,
        last_updated_at = now()
    WHERE id = $3
    `,
    [trustScore, trustLevel, datasetId],
  );
}
