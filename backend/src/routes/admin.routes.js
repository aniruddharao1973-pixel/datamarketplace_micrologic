// src\routes\admin.routes.js
import express from "express";
import { createUser } from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * Admin creates Producer / Consumer users
 */
router.post(
  "/users",
  authenticate,
  authorizeRoles("admin"),
  createUser
);

export default router;
