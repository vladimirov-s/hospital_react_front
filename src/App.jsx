import Main from "./conponents/Main";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div id='App'>
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

export default App;
