import api from "./axios";

export const requestAccess = (datasetId) =>
  api.post(`/access/request/${datasetId}`);

export const decideAccess = (datasetId, userId, decision) =>
  api.post("/access/decision", { datasetId, userId, decision });
