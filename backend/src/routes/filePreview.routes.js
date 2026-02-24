// // backend\src\routes\filePreview.routes.js
// import express from "express";
// import { authenticate } from "../middleware/auth.middleware.js";
// import { previewFile } from "../controllers/filePreview.controller.js";

// const router = express.Router();

// router.get("/preview/:datasetId/:fileId", previewFile);

// export default router;


// backend/src/routes/filePreview.routes.js
import express from "express";
import { optionalAuth } from "../middleware/auth.middleware.js";
import { previewFile } from "../controllers/filePreview.controller.js";

const router = express.Router();

// 🔑 Optional auth: works for logged-in & public users
router.get("/preview/:datasetId/:fileId", optionalAuth, previewFile);

export default router;