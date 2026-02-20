// frontend/src/api/payments.api.js
import api from "./axios";

// create Razorpay order
export const createOrder = (datasetId) =>
  api.post("/payments/create-order", { datasetId });

// verify payment
export const verifyPayment = (payload) => api.post("/payments/verify", payload);
