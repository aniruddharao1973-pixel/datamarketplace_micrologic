// backend\src\routes\filePreview.routes.js
import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { previewFile } from "../controllers/filePreview.controller.js";

const router = express.Router();

router.get("/preview/:datasetId/:fileId", previewFile);

export default router;
