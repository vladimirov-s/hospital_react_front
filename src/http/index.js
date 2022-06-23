import axios from "axios";
import { url_server } from "src/helper/constants";

const api = axios.create({
  withCredentials: true,
  baseURL: url_server,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      return api.request(originalRequest);
    } else {
      throw error;
    }
  }
);

export default api;
