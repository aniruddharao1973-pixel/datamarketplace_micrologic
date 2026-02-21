// backend\src\db\pool.js
import dotenv from "dotenv";
dotenv.config(); // 🔴 MUST be here (before Pool)

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // 🔴 force string
});

export default pool;
