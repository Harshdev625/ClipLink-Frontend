import axios from '../../services/axiosInstance'

export const getAnalytics = (shortCode) => axios.get(`/analytics/${shortCode}`)
