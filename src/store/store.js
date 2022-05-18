import { makeAutoObservable } from "mobx";
import axios from "axios";
import AppointService from "../services/AppointService";
import AuthService from "../services/Authservise";
import { url_server } from "../helper/constants";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  allAppointments = [];
  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(bool) {
    this.isLoading = bool;
  }

  setAuth(bool) {
    this.isAuth = bool;
  }
  setAllAppointments(collection) {
    this.allAppointments = collection;
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
      console.log("зашло в стор и в рефреш");
      const response = await axios.get(`${url_server}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("accesToken", response.data.accessToken);
    } catch (e) {
      next(e);
    }
  };

  async login(name, password) {
    try {
      const response = await AuthService.login(name, password);
      localStorage.setItem("accessToken", response.data.token.accessToken); //
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert("Проверьте правильность введеных данных");
    }
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password);
      localStorage.setItem("accessToken", response.data.token.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      return e;
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
      return e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async getAppointments() {
    try {
      // const response = await AppointService.getAppointments();
      // this.setAllAppointments(response.data.data);
      this.setAllAppointments([2, 3, 42, 3, 234, 23, 3234]);
    } catch (e) {
      console.error(e);
      // alert("Ошибка " + e.name + ":" + e.message);
    }
  }
}

