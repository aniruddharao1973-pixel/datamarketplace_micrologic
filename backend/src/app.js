import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cron from "node-cron";

// Routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import passwordResetRoutes from "./routes/passwordReset.routes.js";
import fileUploadRoutes from "./routes/fileUpload.routes.js";
import datasetRoutes from "./routes/dataset.routes.js";
import fileDownloadRoutes from "./routes/fileDownload.routes.js";
import accessRoutes from "./routes/access.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import filePreviewRoutes from "./routes/filePreview.routes.js";
import googleAuthRoutes from "./routes/googleAuth.routes.js";

// Trust score job
import { runTrustScoreJob } from "./jobs/trustScore.job.js";

const app = express();

// =======================================================
// MIDDLEWARE (ORDER MATTERS)
// =======================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://datamarketplace-micrologic.vercel.app",
      "https://bright-lokum-7db95a.netlify.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

// =======================================================
// HEALTH CHECK (FIRST — IMPORTANT)
// =======================================================

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// =======================================================
// ROUTES
// =======================================================

app.use("/api/auth", authRoutes);
app.use("/api/auth", passwordResetRoutes);
app.use("/api/auth", googleAuthRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/files", fileUploadRoutes);
app.use("/api/files", fileDownloadRoutes);
app.use("/api/files", filePreviewRoutes);

app.use("/api/datasets", datasetRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/payments", paymentRoutes);

// =======================================================
// TRUST SCORE CRON
// =======================================================

cron.schedule("0 2 * * *", async () => {
  console.log("⏳ Running nightly Trust Score job...");
  try {
    await runTrustScoreJob();
  } catch (err) {
    console.error("❌ Trust Score cron failed", err);
  }
});

export default app;
