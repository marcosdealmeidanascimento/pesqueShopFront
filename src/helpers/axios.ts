import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_NAME,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
