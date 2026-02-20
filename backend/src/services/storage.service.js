// src\services\storage.service.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // 🔴 REQUIRED

const STORAGE_ROOT = process.env.STORAGE_ROOT;

if (!STORAGE_ROOT) {
  throw new Error("STORAGE_ROOT is not defined in .env");
}

/**
 * Ensure directory exists
 */
export const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Build storage path: DATE / TYPE
 */
export const buildStoragePath = (type) => {
  if (!type) {
    throw new Error("File type not provided in route param");
  }

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dir = path.join(STORAGE_ROOT, today, type);

  ensureDir(dir);

  return { today, dir };
};
