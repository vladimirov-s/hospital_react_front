import { makeAutoObservable } from "mobx";
import axios from "axios";
import AuthService from "../services/Authservise";
import { url_server } from "../helper/constants";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(bool) {
    this.isLoading = bool;
  }

  setAuth(bool) {
    this.isAuth = bool;
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
      return false;
    }
  }

  async login(name, password) {
    try {
      const response = await AuthService.login(name, password);
      localStorage.setItem("accessToken", response.data.token.accessToken); //
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      return false;
    }
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password);
      localStorage.setItem("accessToken", response.data.token.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      return false;
    }
  }

  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await axios.get(`${url_server}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      return false;
    } finally {
      this.setIsLoading(false);
    }
  }
}
