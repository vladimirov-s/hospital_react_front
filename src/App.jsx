import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Main from "components/Main/Main";
import Appointments from "components/Appointments/Appointments";
import "./App.scss";

const App = () => {
  const store = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    return (
      <div className='App'>
        <div>Загрузка....</div>
      </div>
    );
  }

  if (store.isAuth) {
    return (
      <div className='App'>
        <Appointments />
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Main headText='Войти в систему' />} />
          <Route
            path='/signup'
            element={<Main headText='Зарегистрироваться в системе' />}
          />
        </Routes>
      </div>
    );
  }
};

export default observer(App);
