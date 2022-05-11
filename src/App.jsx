import { Routes, Route } from "react-router-dom";
import Main from "components/Main/Main";
import Appointments from "components/Appointments/Appointments";
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
          element={
            <Main headText='Зарегистрироваться в системе' />
          }
        />
        <Route path='/appointments' element={<Appointments />} />
      </Routes>
    </div>
  );
};

export default App;
