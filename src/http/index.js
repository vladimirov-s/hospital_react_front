import axios from "axios";
import { url_server } from "src/helper/constants";
import Store from "src/store/store";

const api = axios.create({
  withCredentials: true,
  baseURL: url_server,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem("accesToken")}`;
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
      await Store.refresh();
      return api.request(originalRequest);
    } else {
      throw error;
    }
  }
);

export default api;
