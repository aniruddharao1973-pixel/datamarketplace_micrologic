// backend\src\controllers\auth.controller.js
import pool from "../db/pool.js";
import { comparePassword } from "../services/password.service.js";
import { generateToken } from "../utils/token.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND status = 'active'",
    [email],
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = result.rows[0];

  const match = await comparePassword(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user.must_reset_password) {
    return res.status(403).json({
      message: "Password reset required",
      resetRequired: true,
    });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};
