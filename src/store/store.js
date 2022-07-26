import { makeAutoObservable, toJS } from "mobx";
import AppointmentService from "src/services/Authservise";
import AuthService from "../services/Authservise";
import AppointService from "src/services/AppointmentService";
import _ from "lodash";

export default class Store {
  user = {};
  isAuth = false;
  message = "";
  isLoading = false;
  allAppointments = [];
  filteredSorted = [];
  sortBy = "date";
  rangeDates = false;
  sortDirection = "asc";
  requiredAction = false;
  openSnack = false;
  typeOfTask = "";
  stateFields = {
    customer: "",
    doctor: "",
    date: "",
    complaint: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setRangeDates(boolean) {
    this.rangeDates = boolean;
  }

  setDir(string) {
    this.sortDirection = string;
  }

  setFilteredSorted(a) {
    this.filteredSorted = a;
  }

  setSort(string) {
    this.sortBy = string;
  }

  primarySortAppoints() {
    this.setFilteredSorted(
      _.sortBy(toJS(this.allAppointments), toJS(this.sortBy))
    );
  }

  secondarySortAppoints() {
    this.setFilteredSorted(
      _.sortBy(toJS(this.filteredSorted), toJS(this.sortBy))
    );
  }

  getFields() {
    const fields = [];
    for (const key in this.stateFields) {
      fields.push(key);
    }
    return fields;
  }

  setTypeOfTask(string) {
    this.typeOfTask = string;
  }

  setDate(date) {
    this.stateFields.date = date;
  }

  setFields(a, b, d) {
    this.stateFields.customer = a;
    this.stateFields.doctor = b;
    this.stateFields.complaint = d;
  }

  confirmAction(boolean) {
    this.requiredAction = boolean;
  }

  setAllAppointments(collection) {
    this.allAppointments = collection;
  }

  setAuth(boolean) {
    this.isAuth = boolean;
  }

  setIsLoading(boolean) {
    this.isLoading = boolean;
  }

  setOpenSnack(boolean) {
    this.openSnack = boolean;
  }

  snackHolder(string) {
    this.openSnack = true;
    this.message = string;
  }

  setUser(user) {
    this.user = user;
  }

  async logout() {
    try {
      await AppointmentService.logout();
      this.isAuth = false;
      this.setUser({});
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
      }
      if (e.code !== "ERR_NETWORK") {
        this.snackHolder("Что-то пошло не так");
      }
    }
  }

  async login(name, password) {
    try {
      const response = await AppointmentService.login(name, password);
      this.isAuth = true;
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
      this.isAuth = true;
      this.setUser(response.data.user);
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
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
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      return e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async editAppoint(id, appoint, date) {
    try {
      await AppointService.editAppoint(id, appoint, date);
      const response = await AppointService.getAppointments();
      this.setAllAppointments(response.data.data);
      return response.data;
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
      }
      if (e.code !== "ERR_NETWORK") {
        this.snackHolder("Что-то пошло не так");
      }
    }
  }

  async getAppointments() {
    try {
      const response = await AppointService.getAppointments();
      this.setAllAppointments(response.data);
      return response.data;
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
      }
      if (e.code !== "ERR_NETWORK") {
        this.snackHolder("Что-то пошло не так");
      }
    }
  }

  async createAppont(visit) {
    try {
      await AppointService.createAppont(visit);
      const response = await AppointService.getAppointments();
      this.setAllAppointments(response.data.data);
      return response.data;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
      }
      if (err.code !== "ERR_NETWORK") {
        this.snackHolder("Что-то пошло не так");
      }
    }
  }

  async deleteAppointment(id) {
    try {
      const result = await AppointService.deleteAppointment(id);
      return result.data;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        this.snackHolder("Сервер недоступен");
      }
      if (err.code !== "ERR_NETWORK") {
        this.snackHolder("Что-то пошло не так");
      }
    }
  }
}
