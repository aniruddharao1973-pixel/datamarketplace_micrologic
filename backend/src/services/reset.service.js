import crypto from "crypto";

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const getExpiryTime = (minutes = 30) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};
