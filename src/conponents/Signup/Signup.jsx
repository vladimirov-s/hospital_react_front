import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.scss";

const Signup = () => {
  const [showPass, setShowPass] = useState("password");
  return (
    <form className='auth__form flex WrapWrap relative' id='signup'>
      <p className='auth__form__paragraph'>Регистрация</p>
      <div className='auth__form__bodyForm flex WrapWrap absolute'>
        <span className='auth__form_loginandpasswd'>Логин:</span>
        <input
          className='auth__form__textfield'
          type='text'
          placeholder='username'
        />
        <span className='auth__form_loginandpasswd'>Пароль:</span>
        <input
          className='auth__form__textfield'
          type='password'
          placeholder='password'
        />
        <span className='auth__form_loginandpasswd'>
          Повторите пароль:
        </span>
        <input
          className='auth__form__textfield'
          type='password'
          placeholder='password'
        />
      </div>
      <div className='auth__form__botomblok absolute'>
        <button type='submit' className='auth__form__submit relative'>
          Зарегистрироваться
        </button>
        <Link to='/'> Авторизоваться </Link>
      </div>
    </form>
  );
};

export default Signup;
