import pool from "../db/pool.js";

/**
 * Consumer requests access to a dataset
 * → creates a row with status = 'pending'
 */
export const requestAccess = async (req, res) => {
  const { datasetId } = req.params;

  // Check if request already exists
  const existing = await pool.query(
    `
    SELECT id, status
    FROM dataset_permissions
    WHERE dataset_id = $1 AND user_id = $2
    `,
    [datasetId, req.user.id],
  );

  if (existing.rows.length > 0) {
    return res.status(400).json({
      message: `Access already ${existing.rows[0].status}`,
    });
  }

  // Insert new access request
  await pool.query(
    `
    INSERT INTO dataset_permissions (
      dataset_id,
      user_id,
      status
    )
    VALUES ($1, $2, 'pending')
    `,
    [datasetId, req.user.id],
  );

  res.status(201).json({
    message: "Access request submitted",
    status: "pending",
  });
};

/**
 * Admin approves or rejects access
 */
export const decideAccess = async (req, res) => {
  const { datasetId, userId, decision } = req.body;

  if (!["approved", "rejected"].includes(decision)) {
    return res.status(400).json({ message: "Invalid decision" });
  }

  const result = await pool.query(
    `
    UPDATE dataset_permissions
    SET status = $1
    WHERE dataset_id = $2 AND user_id = $3
    RETURNING *
    `,
    [decision, datasetId, userId],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Request not found" });
  }

  res.json({
    message: `Access ${decision}`,
    permission: result.rows[0],
  });
};
