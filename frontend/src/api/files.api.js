// F:\DATA MARKET PLACE MICROLOGIC\frontend\src\api\files.api.js
import api from "./axios";

export const uploadFile = (type, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/files/upload/${type}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadFile = (datasetId, fileId) =>
  api.get(`/files/download/${datasetId}/${fileId}`, {
    responseType: "blob",
  });

export const previewFile = (datasetId, fileId) =>
  api.get(`/files/preview/${datasetId}/${fileId}`);

export const attachFileToDataset = (datasetId, fileId) =>
  api.post(`/datasets/${datasetId}/attach-file/${fileId}`);
