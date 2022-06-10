import { observer } from "mobx-react-lite";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Context } from "src/index";
import { userNameValidate, passwordValidate } from "src/helper/validate";
import "./style.scss";

const Signup = () => {
  const store = useContext(Context);
  const [showPass, setShowPass] = useState("password");
  const [userfield, setUserField] = useState({
    username: "",
    password: "",
    secondPassword: "",
  });
  const { username, password, secondPassword } = userfield;

  const showPasswort = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const blurHandler = () => {
    if (!userNameValidate(username)) {
      store.snackHolder(
        "Поле Login должно быть от 6 символов, разрешены только латинские буквы"
      );
      return;
    }

    if (!passwordValidate(password)) {
      store.snackHolder(
        "Пароль должен быть от 6 до 12 символов латинские буквы и цифры"
      );
      return;
    }

    if (secondPassword !== password) {
      store.snackHolder("Введённые пароли должны совпадать");
      return;
    }
    store.registration(username, password);
  };

  const changeHandler = (text, type) => {
    setUserField({ ...userfield, [type]: text });
  };

  return (
    <div>
      <form className='auth__form' onSubmit={blurHandler}>
        <p className='auth__form__paragraph'>Регистрация</p>
        <div className='auth__form__bodyForm'>
          <label className='auth__form__bodyForm_loginandpassword'>
            Логин:
            <input
              className='auth__form__bodyForm_loginandpassword__textfield'
              type='text'
              placeholder='username'
              name='username'
              autoComplete='off'
              value={username}
              onChange={(e) => changeHandler(e.target.value, "username")}
            />
          </label>

          <label className='auth__form__bodyForm_loginandpassword'>
            <span>Пароль:</span>
            <input
              className='auth__form__bodyForm_loginandpassword__textfield'
              type={showPass}
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => changeHandler(e.target.value, "password")}
            />
            <i
              title={showPass !== "text" ? "Показать пароль" : "Скрыть пароль"}
              onClick={() => showPasswort()}
              className='auth__form__bodyForm_loginandpassword_showPassword'>
              {showPass !== "text" ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </i>
          </label>

          <label className='auth__form__bodyForm_loginandpassword'>
            Повторите пароль:
            <input
              className='auth__form__bodyForm_loginandpassword__textfield'
              type={showPass}
              name='secondPassword'
              placeholder='password'
              value={secondPassword}
              onChange={(e) => {
                changeHandler(e.target.value, "secondPassword");
              }}
            />
          </label>
        </div>
        <div className='auth__form__botomblok'>
          <button className='auth__form__botomblok__submit'>
            Зарегистрироваться
          </button>
          <Link className='auth__form__botomblok_link' to='/'>
            Авторизоваться
          </Link>
        </div>
      </form>
    </div>
  );
};

export default observer(Signup);
