import { OAuth2Client } from "google-auth-library";
import pool from "../db/pool.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { credential } = req.body; // ID token from frontend

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const googleId = payload.sub;

    // 1. Find user
    let userRes = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    let user;

    // 2. If not exists → reject OR auto-create (your choice)
    if (userRes.rowCount === 0) {
      return res.status(403).json({
        message: "User not invited. Contact admin.",
      });
    }

    user = userRes.rows[0];

    // 3. Ensure Google-linked
    if (!user.google_id) {
      await pool.query(
        `UPDATE users
         SET google_id = $1, auth_provider = 'google', status = 'active'
         WHERE id = $2`,
        [googleId, user.id],
      );
    }

    // 4. Issue JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
