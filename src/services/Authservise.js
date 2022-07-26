import api from "src/http/index";

export default class AuthService {
  static async login(username, password) {
    return api.post("auth/login", { name: username, password });
  }

  static async registration(username, password) {
    return api.post("auth/registration", {
      name: username,
      password,
    });
  }

  static async logout() {
    return api.get("auth/logout");
  }

  static async refresh() {
    return api.get("auth/refresh");
  }
}
