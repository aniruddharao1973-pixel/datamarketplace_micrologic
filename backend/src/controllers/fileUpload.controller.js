// src/controllers/fileUpload.controller.js
import pool from "../db/pool.js";
import path from "path";
import crypto from "crypto";
import fs from "fs";

const ALLOWED_TYPES = ["excel", "csv", "pdf", "ppt", "json", "sql", "zip"];

export const uploadFile = async (req, res) => {
  try {
    const { type } = req.params;
    const file = req.file;

    // 1. Validate file presence
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 2. Validate file type
    if (!ALLOWED_TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    // 3. Build OS-safe relative path
    const relativePath = path
      .relative(process.env.STORAGE_ROOT, file.path)
      .replace(/\\/g, "/");

    // 4. Compute checksum (SHA256)
    const fileBuffer = fs.readFileSync(file.path);
    const checksum = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    // 5. Insert file metadata
    const result = await pool.query(
      `
      INSERT INTO file_assets (
        dataset_id,
        file_type,
        storage_date,
        relative_path,
        file_size_mb,
        checksum
      )
      VALUES (NULL, $1, CURRENT_DATE, $2, $3, $4)
      RETURNING id
      `,
      [type, relativePath, (file.size / (1024 * 1024)).toFixed(2), checksum],
    );

    // ✅ IMPORTANT: return file ID at top level
    res.status(201).json({
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("File upload error:", err);
    res.status(500).json({ message: "File upload failed" });
  }
};
