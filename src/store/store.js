import AppointmentService from "src/services/Authservise";
import AppointService from "src/services/AppointmentService";
import _ from "lodash";

export default class Store {
  user = {};
  isAuth = false;
  messages = {};
  lastUid = -1;
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
    this.setFilteredSorted(_.sortBy(this.allAppointments, this.sortBy));
  }

  secondarySortAppoints() {
    this.setFilteredSorted(_.sortBy(this.filteredSorted, this.sortBy));
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
    this.publish("State type of task");
  }

  setDate(date) {
    this.stateFields.date = date;
    this.publish("condition of the date");
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

  setIsLoading(boolean) {
    this.isLoading = boolean;
  }

  snackHolder(string) {
    this.message = string;
    this.publish("message for Snack");
  }

  publish(message) {
    const subscribers = this.messages[message];
    if (this.message.hasOwnProperty(message)) {
      return;
    }

    for (let s in subscribers) {
      if (Object.prototype.hasOwnProperty.call(subscribers, s)) {
        subscribers[s](message);
      }
    }
  }

  subscribe = (message, func) => {
    if (!this.message.hasOwnProperty(message)) {
      this.messages[message] = {};
    }
    let token = "uid_" + String(++this.lastUid);
    this.messages[message][token] = func;
    return token;
  };

  setUser(user) {
    this.user = user;
  }

  async logout() {
    try {
      await AppointmentService.logout();
      this.isAuth = false;
      this.publish("state Auth");
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
      this.publish("state Auth");
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
      const response = await AppointmentService.registration(
        username,
        password
      );
      this.isAuth = true;
      this.publish("state Auth");
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
      const response = await AppointmentService.refresh();
      this.isAuth = true;
      this.setUser(response.data);
      this.publish("state Auth");
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

  async createAppont(visit) {
    try {
      await AppointService.createAppont(this.user, visit);
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
