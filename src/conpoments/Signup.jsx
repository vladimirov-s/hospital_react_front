import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <form className='flex WrapWrap posR' id='signup'>
      <p className='pfzinz'>Регистрация</p>
      <div className='flex WrapWrap posA' id='bdfrm'>
        <span>Логин:</span>
        <input type='text' placeholder='Логин' />
        <span>Пароль:</span>
        <input type='password' placeholder='Пароль' />
        <span>Повторите пароль:</span>
        <input type='password' placeholder='Пароль' />
      </div>
      <div className='nigniyBlok posA'>
        <button className='posR'>Зарегистрироваться</button>
        <Link to='/'> Авторизоваться </Link>
      </div>
    </form>
  );
}; 

export default Signup;
