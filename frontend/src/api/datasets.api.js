// // frontend/src/api/datasets.api.js
// import api from "./axios";

// export const getDatasets = () => api.get("/datasets");

// export const getDataset = (id) => api.get(`/datasets/${id}`);

// export const createDataset = (data) => api.post("/datasets", data);

// // 🔴 soft delete dataset
// export const deleteDataset = (id) =>
//   api.delete(`/datasets/${id}`);

// frontend/src/api/datasets.api.js
import api from "./axios";

// Get all datasets (marketplace listing)
export const getDatasets = () => api.get("/datasets");

// Get single dataset (details page)
export const getDataset = (id) => api.get(`/datasets/${id}`);

// Create dataset (producer/admin)
export const createDataset = (data) => api.post("/datasets", data);

// Soft delete dataset
export const deleteDataset = (id) => api.delete(`/datasets/${id}`);

// ✅ NEW: Get datasets purchased by logged-in user
export const getMyPurchasedDatasets = () => api.get("/datasets/my/purchases");

export const updateDatasetPrice = (datasetId, priceInr) =>
  api.patch(`/datasets/${datasetId}/price`, { priceInr });
