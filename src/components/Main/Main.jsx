import Header from "components/Header/Header";
import Signup from "components/Signup/Signup";
import Login from "components/Login/Login";
import { Hospital } from "components/pics";
import "./main.scss";

const Authentication = ({ headText }) => {
  return (
    <div className='main'>
      <Header headText={headText} />
      <div className='main__wrap'>
        <Hospital need='secLogo' />
        {headText !== "Войти в систему" ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Authentication;
