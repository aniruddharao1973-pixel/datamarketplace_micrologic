// frontend/src/api/datasets.api.js
import api from "./axios";

export const getDatasets = () => api.get("/datasets");

export const getDataset = (id) => api.get(`/datasets/${id}`);

export const createDataset = (data) => api.post("/datasets", data);

// 🔴 soft delete dataset
export const deleteDataset = (id) =>
  api.delete(`/datasets/${id}`);