// backend\src\services\password.service.js
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateTempPassword = () => {
  return Math.random().toString(36).slice(-10);
};

