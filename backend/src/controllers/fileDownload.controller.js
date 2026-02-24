// src\controllers\fileDownload.controller.js
import pool from "../db/pool.js";
import path from "path";
import fs from "fs";
import { recalculateTrustScore } from "../services/trustScore.service.js";
/**
 * Secure file download
 * Route: GET /files/download/:datasetId/:fileId
 */
export const downloadFile = async (req, res) => {
  const { datasetId, fileId } = req.params;

  try {
    // 1. Fetch file and validate dataset ownership
    const result = await pool.query(
      `
      SELECT relative_path
      FROM file_assets
      WHERE id = $1
        AND dataset_id = $2
      `,
      [fileId, datasetId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const relativePath = result.rows[0].relative_path;

    // 2. Resolve absolute path safely
    const storageRoot = path.resolve(process.env.STORAGE_ROOT);
    const absolutePath = path.resolve(storageRoot, relativePath);

    // Prevent path traversal
    if (!absolutePath.startsWith(storageRoot)) {
      return res.status(400).json({ message: "Invalid file path" });
    }

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File missing on disk" });
    }

    // 3. Stream file (safe for large files)
    const filename = path.basename(absolutePath);

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    const stream = fs.createReadStream(absolutePath);

    stream.on("end", async () => {
      await pool.query(
        `
    INSERT INTO dataset_downloads (user_id, dataset_id, file_id, status)
    VALUES ($1, $2, $3, 'SUCCESS')
    `,
        [req.user?.id || null, datasetId, fileId],
      );

      await recalculateTrustScore(datasetId);
    });

    stream.on("error", async () => {
      await pool.query(
        `
    INSERT INTO dataset_downloads (user_id, dataset_id, file_id, status)
    VALUES ($1, $2, $3, 'FAILED')
    `,
        [req.user?.id || null, datasetId, fileId],
      );
    });

    stream.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "File download failed" });
  }
};
