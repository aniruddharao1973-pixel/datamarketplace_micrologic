// backend/src/controllers/dataset.controller.js
import pool from "../db/pool.js";

/**
 * Create dataset
 */
export const createDataset = async (req, res) => {
  const { name, description, datasetType, accessType, priceInr, tags } =
    req.body;

  if (!name || !datasetType) {
    return res
      .status(400)
      .json({ message: "Name and datasetType are required" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO datasets (
        name,
        description,
        dataset_type,
        owner_id,
        access_type,
        price_inr,
        tags
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        name,
        description || null,
        datasetType,
        req.user.id,
        accessType || "restricted",
        Number(priceInr) || 0,
        tags || [],
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ createDataset failed:", err);
    res.status(500).json({ message: "Failed to create dataset" });
  }
};

/**
 * Attach uploaded file to dataset
 */
export const attachFileToDataset = async (req, res) => {
  const { datasetId, fileId } = req.params;

  try {
    const result = await pool.query(
      `
      UPDATE file_assets
      SET dataset_id = $1
      WHERE id = $2
      RETURNING *
      `,
      [datasetId, fileId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json({
      message: "File attached to dataset",
      file: result.rows[0],
    });
  } catch (err) {
    console.error("❌ attachFileToDataset failed:", err);
    res.status(500).json({ message: "Failed to attach file" });
  }
};

/**
 * List datasets
 */
export const listDatasets = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        d.id,
        d.name,
        d.description,
        d.dataset_type,
        d.access_type,
        d.price_inr,
        d.created_at,
        u.email AS owner
      FROM datasets d
      JOIN users u ON d.owner_id = u.id
      WHERE d.is_deleted = false
      ORDER BY d.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ listDatasets failed:", err);
    res.status(500).json({ message: "Failed to load datasets" });
  }
};

/**
 * Get dataset details
 */
export const getDatasetById = async (req, res) => {
  const { id: datasetId } = req.params;
  const userId = req.user?.id || null;

  try {
    // 1. Dataset
    const datasetRes = await pool.query(
      `
      SELECT *
      FROM datasets
      WHERE id = $1
        AND is_deleted = false
      `,
      [datasetId],
    );

    if (datasetRes.rowCount === 0) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    const dataset = datasetRes.rows[0];

    // 2. Files
    const filesRes = await pool.query(
      `
      SELECT
        id,
        file_type,
        relative_path,
        file_size_mb,
        created_at
      FROM file_assets
      WHERE dataset_id = $1
      ORDER BY created_at DESC
      `,
      [datasetId],
    );

    // 3. Ownership
    const isOwner = userId && dataset.owner_id === userId;

    // 4. Upload permission
    const canUpload =
      req.user && (req.user.role === "admin" || req.user.role === "producer");

    // 5. Access (paid / approved)
    let hasAccess = false;

    if (userId) {
      const accessRes = await pool.query(
        `
        SELECT 1
        FROM dataset_permissions
        WHERE dataset_id = $1
          AND user_id = $2
          AND status = 'approved'
        `,
        [datasetId, userId],
      );

      hasAccess = accessRes.rowCount > 0;
    }

    res.json({
      ...dataset,
      isOwner,
      canUpload,
      hasAccess,
      files: filesRes.rows,
    });
  } catch (err) {
    console.error("❌ getDatasetById failed:", err);
    res.status(500).json({ message: "Failed to load dataset details" });
  }
};

/**
 * Soft delete dataset
 */
export const deleteDataset = async (req, res) => {
  const { id: datasetId } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const result = await pool.query(
      `
      UPDATE datasets
      SET is_deleted = true,
          deleted_at = now()
      WHERE id = $1
        AND (owner_id = $2 OR $3 = 'admin')
      RETURNING id
      `,
      [datasetId, userId, userRole],
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Dataset not found or not authorized" });
    }

    res.json({ message: "Dataset deleted (soft delete)" });
  } catch (err) {
    console.error("❌ deleteDataset failed:", err);
    res.status(500).json({ message: "Failed to delete dataset" });
  }
};
