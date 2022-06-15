import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "src/index";
import PubSub from "pubsub-js";
import Main from "components/Main/Main";
import Appointments from "components/Appointments/Appointments";
import "./style.scss";

const App = () => {
  const store = useContext(Context);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authHolder = () => {
    setIsAuth(store.isAuth);
  };

  const loadingHolder = () => {
    setIsLoading(store.isLoading);
  };

  PubSub.subscribe("state Auth", authHolder);
  PubSub.subscribe("state Loading", loadingHolder);

  useEffect(() => {
    store.checkAuth();
  }, [store]);

  if (isLoading) {
    return (
      <div className='App'>
        <div>Загрузка....</div>
      </div>
    );
  }

  if (isAuth) {
    return (
      <div className='App'>
        <Routes>
          <Route path='/appointments' element={<Appointments />} />
          <Route path='*' element={<Navigate to='/appointments' />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Main headText='Войти в систему' />} />
        <Route
          path='/signup'
          element={<Main headText='Зарегистрироваться в системе' />}
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
};

export default App;
