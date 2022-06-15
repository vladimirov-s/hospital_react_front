import axios from "axios";
import PubSub from "pubsub-js";
import AuthService from "src/services/Authservise";
import { url_server } from "src/helper/constants";

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
      PubSub.publish("state Auth");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      return e;
    }
  }

  async login(name, password) {
    try {
      const response = await AuthService.login(name, password);
      PubSub.publish("state Auth");
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
      }
      if (e.response.status === 400) {
        this.snackHolder("Проверьте правильность введеных данных");
      }
    }
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password);
      PubSub.publish("state Auth");
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.setOpenSnack(true);
        this.setMessage("Сервер недоступен");
      }
      if (e.response.status === 409) {
        this.snackHolder("Такой юзернэйм уже существует");
      }
      return e;
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await AuthService.refresh();
      PubSub.publish("state Auth");
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      return e;
    } finally {
      PubSub.publish("state Loading");
      this.setIsLoading(false);
    }
  }
}
