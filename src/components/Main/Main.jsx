import Header from "/home/user/sergeech/hospital_react_front/src/components/Header/Header";
import Signup from "/home/user/sergeech/hospital_react_front/src/components/Signup/Signup";
import Login from "/home/user/sergeech/hospital_react_front/src/components/Login/Login";
import "./main.scss";
import { Hospital } from "/home/user/sergeech/hospital_react_front/src/components/Pics";

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
