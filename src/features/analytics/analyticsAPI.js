import axios from '../../services/axiosInstance';

export const getAnalytics = async (shortCode, page = 1, limit = 10) => {
  const response = await axios.get(`/api/analytics/${shortCode}?page=${page}&limit=${limit}`);
  return response.data;
};