import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import Store from "./store/store";
import "./index.scss";

export const store = new Store();

export const Context = createContext(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Context.Provider>
);
