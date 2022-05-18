import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import Main from "components/Main/Main";
import Appointments from "components/Appointments/Appointments";
import "./App.scss";

const App = () => {
  // mobx используется для хранения и обработки состояний в контексте

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
        <Routes>
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/*' element={<Navigate to='/appointments' />} />
        </Routes>
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className='App'>
        <Routes>
          <Route path='/*' element={<Navigate to='/' />} />
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
