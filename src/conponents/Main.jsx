import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
// import
import { Hospital } from "./Pics";
const Authentication = ({ headText }) => {
  return (
    <div id='signup'>
      <Header headText={headText} />
      <div className='flex' id='wrap'>
        <Hospital id='secLogo' />
        {headText !== "Войти в систему" ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Authentication;
