// backend\src\controllers\filePreview.controller.js
import pool from "../db/pool.js";
import path from "path";
import fs from "fs";
import csvParser from "csv-parser";
import PDFParser from "pdf2json";
import XLSX from "xlsx";
import readline from "readline";
import AdmZip from "adm-zip";

export const previewFile = async (req, res) => {
  const { datasetId, fileId } = req.params;

  try {
    // 1. Validate file belongs to dataset
    const fileRes = await pool.query(
      `
      SELECT relative_path, file_type
      FROM file_assets
      WHERE id = $1 AND dataset_id = $2
      `,
      [fileId, datasetId],
    );

    if (fileRes.rowCount === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const { relative_path, file_type } = fileRes.rows[0];

    // 2. Resolve safe absolute path
    const storageRoot = path.resolve(process.env.STORAGE_ROOT);
    const safeRelativePath = relative_path.replace(/^\/+/, "");
    const absolutePath = path.resolve(storageRoot, safeRelativePath);

    if (!absolutePath.startsWith(storageRoot)) {
      return res.status(400).json({ message: "Invalid file path" });
    }

    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File missing" });
    }

    // =========================
    // CSV PREVIEW (first 10 rows)
    // =========================
    if (file_type === "csv") {
      const rows = [];
      fs.createReadStream(absolutePath)
        .pipe(csvParser())
        .on("data", (row) => {
          if (rows.length < 10) rows.push(row);
        })
        .on("end", () => {
          res.json({ type: "csv", rows });
        });
      return;
    }

    // =========================
    // JSON PREVIEW (first 20 lines)
    // =========================
    if (file_type === "json") {
      const lines = fs
        .readFileSync(absolutePath, "utf-8")
        .split("\n")
        .slice(0, 20);

      return res.json({ type: "json", lines });
    }

    // =========================
    // PDF PREVIEW (stream actual PDF)
    // =========================
    if (file_type === "pdf") {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");

      return fs.createReadStream(absolutePath).pipe(res);
    }

    // =========================
    // SQL PREVIEW (schema-only, first 20 lines)
    // =========================
    if (file_type === "sql") {
      const lines = [];
      const stream = fs.createReadStream(absolutePath, { encoding: "utf-8" });

      const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        const trimmed = line.trim().toUpperCase();

        // Skip data-heavy statements
        if (
          trimmed.startsWith("INSERT") ||
          trimmed.startsWith("COPY") ||
          trimmed.startsWith("LOCK") ||
          trimmed.startsWith("SELECT")
        ) {
          continue;
        }

        lines.push(line);

        if (lines.length >= 20) break;
      }

      rl.close();
      stream.destroy();

      return res.json({
        type: "sql",
        lines,
        note: "Schema preview only (first 20 lines)",
      });
    }

    // =========================
    // ZIP PREVIEW (list files only)
    // =========================
    if (file_type === "zip") {
      const zip = new AdmZip(absolutePath);
      const entries = zip.getEntries();

      const files = entries.map((entry) => ({
        name: entry.entryName,
        size_kb: (entry.header.size / 1024).toFixed(2),
        isDirectory: entry.isDirectory,
      }));

      return res.json({
        type: "zip",
        files,
        note: "ZIP preview shows file list only",
      });
    }

    // =========================
    // EXCEL PREVIEW (first 20 rows)
    // =========================
    if (file_type === "excel") {
      const workbook = XLSX.readFile(absolutePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils
        .sheet_to_json(sheet, {
          header: 1,
          range: 0,
          blankrows: false,
        })
        .slice(0, 20);

      return res.json({
        type: "excel",
        sheet: sheetName,
        rows,
      });
    }

    // =========================
    // UNSUPPORTED FILE TYPE
    // =========================
    res.status(400).json({ message: "Preview not supported" });
  } catch (err) {
    console.error("Preview error:", err);
    res.status(500).json({ message: "Preview failed" });
  }
};
