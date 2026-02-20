// backend\src\app.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import passwordResetRoutes from "./routes/passwordReset.routes.js";
import fileUploadRoutes from "./routes/fileUpload.routes.js";
import datasetRoutes from "./routes/dataset.routes.js";
import fileDownloadRoutes from "./routes/fileDownload.routes.js";
import accessRoutes from "./routes/access.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import filePreviewRoutes from "./routes/filePreview.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", passwordResetRoutes);
app.use("/api/files", fileUploadRoutes);
app.use("/api/datasets", datasetRoutes);
app.use("/api/files", fileDownloadRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/files", filePreviewRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
