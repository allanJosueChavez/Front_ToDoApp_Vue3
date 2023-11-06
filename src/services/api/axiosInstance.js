
import axios from 'axios'
import errorHandler from './responseHandlers/errorHandler'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000
  })


  axiosInstance.interceptors.response.use(
     (response) => {
      if(response.status === 200){
      } 
      return response;
    },
    (error) => {
      errorHandler.evaluateResponse(error);
      return Promise.reject(error);
    }
);



export default axiosInstance;