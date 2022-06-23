import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "src/index";
import Authentication from "components/Authentication/Authentication";
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

  useEffect(() => {
    store.checkAuth();
    store.subscribe("state Loading", loadingHolder);
    store.subscribe("state Auth", authHolder);
  }, []);

  if (isLoading) {
    return (
      <div className='App'>
        <h5>Загрузка....</h5>
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
        <Route
          path='/login'
          element={<Authentication headText='Войти в систему' />}
        />
        <Route
          path='/signup'
          element={<Authentication headText='Зарегистрироваться в системе' />}
        />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
};

export default App;
