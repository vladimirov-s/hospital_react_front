import Header from "./../Header/Header";
import Signup from "../Signup/Signup";
import Login from "./../Login/Login";
import "./main.scss";
import { Hospital } from "../Pics";

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
