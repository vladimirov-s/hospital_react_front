import api from "../http";

export default class AuthService {
  static async login(username, password) {
    return api.post("/login", { name: username, password: password });
  }

  static async registration(username, password) {
    return api.post("/registration", { name: username, password:password });
  }

  static async logout() {
    return api.post("/logout");
  }
}
