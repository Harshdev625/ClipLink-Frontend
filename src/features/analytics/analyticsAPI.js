import axios from '../../services/axiosInstance'

export const getAnalytics = async (shortCode) => {
  const response = await axios.get(`/api/analytics/${shortCode}`);
  return response.data;
}