import { callApiWithAuth } from "./apiService";

export const getStats = async () => {
  return await callApiWithAuth("/stats", "GET");
};
