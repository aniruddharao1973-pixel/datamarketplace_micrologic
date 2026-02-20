import pool from "../db/pool.js";
import {
  generateResetToken,
  getExpiryTime,
} from "../services/reset.service.js";
import { hashPassword } from "../services/password.service.js";

/**
 * REQUEST RESET
 */
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const userResult = await pool.query(
    "SELECT id FROM users WHERE email = $1 AND status = 'active'",
    [email],
  );

  if (userResult.rows.length === 0) {
    // Do not leak user existence
    return res.json({ message: "If the user exists, reset instructions sent" });
  }

  const userId = userResult.rows[0].id;

  // Invalidate old tokens
  await pool.query(
    "UPDATE password_resets SET used = true WHERE user_id = $1",
    [userId],
  );

  const token = generateResetToken();
  const expiresAt = getExpiryTime(30);

  await pool.query(
    `
    INSERT INTO password_resets (user_id, reset_token, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, token, expiresAt],
  );

  // Later → send email with token link
  res.json({
    message: "Password reset link generated",
    resetToken: token, // TEMP: remove when email is added
  });
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const result = await pool.query(
    `
    SELECT pr.id, pr.user_id
    FROM password_resets pr
    WHERE pr.reset_token = $1
      AND pr.used = false
      AND pr.expires_at > now()
    `,
    [token],
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const { id: resetId, user_id } = result.rows[0];

  const passwordHash = await hashPassword(newPassword);

  await pool.query(
    `
    UPDATE users
    SET password_hash = $1,
        must_reset_password = false
    WHERE id = $2
    `,
    [passwordHash, user_id],
  );

  await pool.query(
    `
    UPDATE password_resets
    SET used = true
    WHERE id = $1
    `,
    [resetId],
  );

  res.json({ message: "Password reset successful" });
};
