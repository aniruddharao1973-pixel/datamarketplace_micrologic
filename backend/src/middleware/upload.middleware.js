// src/middleware/upload.middleware.js
import multer from "multer";
import path from "path";
import { buildStoragePath } from "../services/storage.service.js";

const ALLOWED_TYPES = [
  "excel",
  "csv",
  "pdf",
  "ppt",
  "json",
  "sql",  // ✅ database snapshot
  "zip",  // ✅ optional
];

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { type } = req.params;

      if (!ALLOWED_TYPES.includes(type)) {
        return cb(new Error("Unsupported file type"), null);
      }

      const { dir } = buildStoragePath(type);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const safeName =
        Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
      cb(null, safeName);
    },
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});