import Header from "components/Header/Header";
import Signup from "components/Signup/Signup";
import Login from "components/Login/Login";
import Snack from "components/Snack/Snack";
import bodyLogo from "src/imgs/bodyLogo.svg";
import "./style.scss";

const Authentication = ({ headText }) => {
  return (
    <div className='main'>
      <Header headText={headText} />
      <div className='main__wrap'>
        <img src={bodyLogo} className='bodyLogo' alt='' />
        {headText !== "Войти в систему" ? <Signup /> : <Login />}
      </div>
      <Snack />
    </div>
  );
};

export default Authentication;
