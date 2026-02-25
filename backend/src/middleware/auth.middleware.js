// // backend\src\middleware\auth.middleware.js
// import jwt from "jsonwebtoken";

// export const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


// backend\src\middleware\auth.middleware.js
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

/**
 * STRICT AUTH (existing behavior)
 */
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userRes = await pool.query(
      "SELECT id, email, role FROM users WHERE id = $1",
      [decoded.id],
    );

    if (userRes.rowCount === 0) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = userRes.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * OPTIONAL AUTH (NEW – required for preview)
 * - Attaches req.user if token exists
 * - Does NOT block public access
 */
export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userRes = await pool.query(
      "SELECT id, email, role FROM users WHERE id = $1",
      [decoded.id],
    );

    if (userRes.rowCount > 0) {
      req.user = userRes.rows[0];
    }
  } catch {
    // silently ignore invalid token
  }

  next();
};
