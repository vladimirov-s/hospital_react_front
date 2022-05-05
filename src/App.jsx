import { Routes, Route } from "react-router-dom";
import Main from ".//components/Main/Main";
import "./App.scss";

const App = () => {
  return (
    <div id='App'>
      <Routes>
        <Route
          path='/'
          element={<Main headText='Войти в систему' />}
        />
        <Route
          path='/signup'
          element={<Main headText='Зарегистрироваться в системе' />}
        />
      </Routes>
    </div>
  );
};

export default App;
