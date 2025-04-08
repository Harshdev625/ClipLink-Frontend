import axios from '../../services/axiosInstance'

export const createShortLink = (data) => axios.post('/links/create', data)
export const getAllLinks = () => axios.get('/links')
