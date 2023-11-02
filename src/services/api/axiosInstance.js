
import axios from 'axios'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000
  })

export default axiosInstance;