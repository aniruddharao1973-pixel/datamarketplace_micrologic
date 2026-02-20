// backend\src\routes\fileUpload.routes.js
import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uploadFile } from "../controllers/fileUpload.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/upload/:type",
  authenticate,
  authorizeRoles("admin", "producer"),
  upload.single("file"),
  uploadFile,
);

export default router;
