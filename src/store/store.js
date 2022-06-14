import axios from "axios";
import AuthService from "src/services/Authservise";
import { url_server } from "src/helper/constants";
import PubSub from "pubsub-js";

export default class Store {
  user = {};
  isAuth = false;
  message = "";
  isLoading = false;

  setMessage(string) {
    this.message = string;
  }

  setIsLoading(boolean) {
    this.isLoading = boolean;
  }

  setAuth(boolean) {
    this.isAuth = boolean;
  }

  snackHolder(string) {
    this.setMessage(string);
    PubSub.publish("message for Snack", string);
  }

  setUser(user) {
    this.user = user;
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      return e;
    }
  }

  refresh = async (next) => {
    try {
      await axios.get(`${url_server}/refresh`, {
        withCredentials: true,
      });
    } catch (e) {
      next(e);
    }
  };

  async login(name, password) {
    try {
      const response = await AuthService.login(name, password);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.setOpenSnack(true);
        this.setMessage("Сервер недоступен");
      }
      if (e.response.status === 400) {
        this.setOpenSnack(true);
        this.setMessage("Проверьте правильность введеных данных");
      }
    }
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.setOpenSnack(true);
        this.setMessage("Сервер недоступен");
      }
      if (e.response.status === 409) {
        this.setOpenSnack(true);
        this.setMessage("Такой юзернэйм уже существует");
      }
      return e;
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await AuthService.refresh();
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      return e;
    } finally {
      this.setIsLoading(false);
    }
  }
}
