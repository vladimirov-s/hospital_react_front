import axios from "axios";
import { url_server } from "../helper/constants";

const api = axios.create({
  withCredentials: true,
  baseURL: url_server,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem("accesToken")}`;
  return config;
});

const refresh = async () => {
  try {
    const response = await axios.get(`${url_server}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("accesToken", response.data.accessToken);
  } catch (e) {
    return false;
  }
};

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      await refresh();
      return api.request(originalRequest);
    } else {
      throw error;
    }
  }
);

export default api;
