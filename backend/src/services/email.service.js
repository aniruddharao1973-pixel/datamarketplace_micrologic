// backend/src/services/email.service.js
import nodemailer from "nodemailer";
import dns from "dns";

// 🔒 Prefer IPv4 (prevents IPv6 ENETUNREACH issues)
dns.setDefaultResultOrder("ipv4first");

// ✅ Create SMTP transporter (Gmail SSL)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // smtp.gmail.com
  port: 465, // SSL port
  secure: true, // MUST be true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Gmail App Password
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
});

// 🔎 Verify SMTP connection on startup
(async () => {
  try {
    await transporter.verify();
    console.log("[EMAIL] SMTP connection verified (Gmail 465)");
  } catch (err) {
    console.error("[EMAIL] SMTP verification failed:", err.message);
  }
})();

// 📧 Send welcome email
export const sendUserWelcomeEmail = async ({ to, role, tempPassword }) => {
  const loginUrl = `${process.env.FRONTEND_URL}/login`;

  await transporter.sendMail({
    from: `"Data Marketplace" <${process.env.SMTP_USER}>`,
    to,
    subject: "Your Data Marketplace Account",
    html: `
      <p>Hello,</p>

      <p>Your account has been created in <b>Data Marketplace</b>.</p>

      <p><b>Role:</b> ${role}</p>
      <p><b>Temporary Password:</b> ${tempPassword}</p>

      <p>Please log in using the link below and reset your password immediately:</p>

      <p>
        <a href="${loginUrl}">${loginUrl}</a>
      </p>

      <p>— Data Marketplace Team</p>
    `,
  });
};
