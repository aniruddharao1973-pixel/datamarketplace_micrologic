// frontend\src\api\datasets.api.js
import api from "./axios";

export const getDatasets = () => api.get("/datasets");
export const getDataset = (id) => api.get(`/datasets/${id}`);
export const createDataset = (data) => api.post("/datasets", data);
export const attachFile = (datasetId, fileId) =>
  api.post(`/datasets/${datasetId}/files/${fileId}`);
export const deleteDataset = (id) => api.delete(`/datasets/${id}`);
