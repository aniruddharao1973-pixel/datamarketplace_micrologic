// // backend\src\routes\access.routes.js
// import express from "express";
// import {
//   requestAccess,
//   decideAccess,
// } from "../controllers/access.controller.js";
// import { authenticate } from "../middleware/auth.middleware.js";
// import { authorizeRoles } from "../middleware/role.middleware.js";

// const router = express.Router();

// router.post(
//   "/request/:datasetId",
//   authenticate,
//   authorizeRoles("consumer"),
//   requestAccess,
// );

// router.post("/decision", authenticate, authorizeRoles("admin"), decideAccess);

// export default router;

import express from "express";

const router = express.Router();

/**
 * Access request & approval routes REMOVED
 * Purchase-first model:
 * - Access is granted only via Razorpay payment
 * - No manual approvals
 * - No access requests
 */

// Intentionally left empty

export default router;
