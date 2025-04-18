import axios from "../../services/axiosInstance";

export const login = async ({ email, password }) => {
  const response = await axios.post("/api/auth/login", { email, password });
  return response.data;
};
