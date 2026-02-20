// backend\src\routes\dataset.routes.js
import express from "express";
import {
  createDataset,
  attachFileToDataset,
  listDatasets,
  getDatasetById,
  deleteDataset,
} from "../controllers/dataset.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "producer"),
  createDataset,
);

router.post(
  "/:datasetId/attach-file/:fileId",
  authenticate,
  authorizeRoles("admin", "producer"),
  attachFileToDataset,
);

router.get("/", authenticate, listDatasets);
router.get("/:id", authenticate, getDatasetById);

export default router;
