// src/routes/fileDownload.routes.js
import express from "express";
import { downloadFile } from "../controllers/fileDownload.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { canDownload } from "../middleware/downloadPermission.middleware.js";

const router = express.Router();

// datasetId is REQUIRED for permission check
router.get(
  "/download/:datasetId/:fileId",
  authenticate,
  canDownload,
  downloadFile
);

export default router;