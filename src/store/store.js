import AuthService from "src/services/Authservise";

export default class Store {
  user = {};
  isAuth = false;
  messages = {};
  ALL_SUBSCRIBING_MSG = "*";
  lastUid = -1;
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
    this.publish("message for Snack");
  }

  callSubscriber(subscriber, message) {
    try {
      subscriber(message);
    } catch (ex) {
      console.error(ex);
    }
  }

  deliverMessage(originalMessage, matchedMessage) {
    let subscribers = this.messages[matchedMessage];
    this.callSubscriber();
    if (!Object.prototype.hasOwnProperty.call(this.messages, matchedMessage)) {
      return;
    }

    for (let s in subscribers) {
      if (Object.prototype.hasOwnProperty.call(subscribers, s)) {
        this.callSubscriber(subscribers[s], originalMessage);
      }
    }
  }

  createDeliveryFunction(message) {
    return () => {
      let topic = String(message),
        position = topic.lastIndexOf(".");

      this.deliverMessage(message, message);

      while (position !== -1) {
        topic = topic.substr(0, position);
        position = topic.lastIndexOf(".");
        this.deliverMessage(message, topic);
      }

      this.deliverMessage(message, this.ALL_SUBSCRIBING_MSG);
    };
  }

  publish(message) {
    let deliver = this.createDeliveryFunction(message);
    deliver();
  }

  subscribe = (message, func) => {
    if (!Object.prototype.hasOwnProperty.call(this.messages, message)) {
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
      await AuthService.logout();
      this.setAuth(false);
      this.publish("state Auth");
      this.setUser({});
    } catch (e) {
      return e;
    }
  }

  async login(name, password) {
    try {
      const response = await AuthService.login(name, password);
      this.setAuth(true);
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
      const response = await AuthService.registration(username, password);
      this.setAuth(true);
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
    this.publish("state Loading");
    try {
      const response = await AuthService.refresh();
      this.publish("state Auth");
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      return e;
    } finally {
      this.setIsLoading(false);
    }
  }
}
