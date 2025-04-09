import axios from '../../services/axiosInstance'

export const createShortLink = async (linkData) => {
  const response = await axios.post('/api/links/create', linkData);
  return response.data;
};

export const getAllLinks = async () => {
  const response = await axios.get('/api/links/my-links');
  return response.data;
};