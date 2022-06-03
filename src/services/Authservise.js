import api from "src/http/index";

export default class AuthService {
  static login(username, password) {
    return api.post("auth/login", { name: username, password: password });
  }

  static registration(username, password) {
    return api.post("auth/registration", {
      name: username,
      password: password,
    });
  }

  static logout() {
    return api.get("auth/logout");
  }

  static refresh() {
    return api.get("auth/refresh");
  }
}
