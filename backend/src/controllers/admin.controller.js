// backend\src\controllers\admin.controller.js
import pool from "../db/pool.js";
import {
  hashPassword,
  generateTempPassword,
} from "../services/password.service.js";
import { sendUserWelcomeEmail } from "../services/email.service.js";

export const createUser = async (req, res) => {
  const { email, role } = req.body;

  // Validate role
  if (!email || !["producer", "consumer"].includes(role)) {
    return res.status(400).json({ message: "Invalid email or role" });
  }

  // Prevent duplicate users
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (existing.rows.length > 0) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Generate temp password
  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  // Insert user
  const result = await pool.query(
    `
    INSERT INTO users (
      email,
      password_hash,
      role,
      status,
      must_reset_password
    )
    VALUES ($1, $2, $3, 'active', true)
    RETURNING id, email, role
    `,
    [email, passwordHash, role],
  );

  // Send email (do NOT fail user creation if email fails)
  let emailSent = true;

  try {
    await sendUserWelcomeEmail({ to: email, role, tempPassword });
  } catch (err) {
    emailSent = false;
    console.error("Email sending failed:", err.message);
  }

  res.status(201).json({
    message: "User created successfully",
    user: result.rows[0],
    emailSent,
  });
};
