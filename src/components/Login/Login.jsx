import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Context } from "src/index";
import { userNameValidate, passwordValidate } from "src/helper/validate";
import "./style.scss";

const Login = () => {
  const store = useContext(Context);
  const [showPass, setShowPass] = useState("password");
  const [userField, setUserField] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (text, type) => {
    setUserField({ ...userField, [type]: text });
  };

  const showPassword = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const blurHandler = (e) => {
    e.preventDefault();
    if (!userNameValidate(userField.username)) {
      store.snackHolder(
        "Поле Login должно быть от 6 символов, разрешены только латинские буквы"
      );
      return;
    }
    if (!passwordValidate(userField.password)) {
      store.snackHolder(
        "Пароль должен быть от 6 до 12 символов латинские буквы и цифры"
      );
      return;
    }
    store.login(userField.username, userField.password);
  };

  return (
    <div>
      <form onSubmit={blurHandler} className='auth__form'>
        <p className='auth__form__paragraph'>Войти в систему </p>
        <div className='auth__form__bodyForm'>
          <label className='auth__form__bodyForm_loginandpassword'>
            Логин:
            <input
              className='auth__form__bodyForm_loginandpassword__textfield'
              name='username'
              placeholder='username'
              autoComplete='off'
              onChange={(e) => changeHandler(e.target.value, "username")}
            />
          </label>
          <label className='auth__form__bodyForm_loginandpassword'>
            <span> Пароль:</span>
            <input
              className='auth__form__bodyForm_loginandpassword__textfield'
              type={showPass}
              name='password'
              placeholder='password'
              onChange={(e) => changeHandler(e.target.value, "password")}
            />
            <i
              title={showPass === "text" ? "Скрыть пароль" : "Показать пароль"}
              onClick={showPassword}
              className='auth__form__bodyForm_loginandpassword_showPassword'>
              {showPass !== "text" ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </i>
          </label>
        </div>
        <div className='auth__form__botomblok'>
          <button className='auth__form__botomblok__submit'>Вход</button>
          <Link className='auth__form__botomblok_link' to='/signup'>
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
