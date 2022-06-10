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
  const [errors, setErrors] = useState({
    errorUserName: "",
    errorPassword: "",
    errorSecondPassword: "",
  });
  const { username, password, secondPassword } = userfield;
  const { errorUserName, errorPassword, errorSecondPassword } = errors;
  const registr = (e) => {
    e.preventDefault();
    if (tryValidSetState) {
      store.registration(username, password);
    }
  };

  const showPasswort = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const errorHandler = (msg, errName) => {
    setErrors({
      ...errors,
      [errName]: msg,
    });
  };

  const checkEqualPass = () => {
    if (!secondPassword) {
      return true;
    }
    return password === secondPassword;
  };

  const blurHandler = (e) => {
    const candidate = e.target.name;

    if (candidate === "username") {
      if (userNameValidate(username)) {
        errorHandler("", "errorUserName");
      } else {
        errorHandler(
          "Поле Login должно быть от 6 символов, разрешены только латинские буквы",
          "errorUserName"
        );
      }
    }

    if (candidate === "password") {
      if (passwordValidate(password)) {
        errorHandler("", "errorPassword");
      } else {
        errorHandler(
          "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
          "errorPassword"
        );
      }
    }
    if (candidate === "secondPassword" && secondPassword === password) {
      errorHandler("", "errorSecondPassword");
    }

    if (candidate === "secondPassword" && secondPassword !== password) {
      errorHandler("Введённые пароли должны совпадать", "errorSecondPassword");
    }

    tryValidSetState();
  };

  const changeHandler = (text, type) => {
    setUserField({ ...userfield, [type]: text });
  };

  const tryValidSetState = () => {
    return (
      !errorUserName &&
      !errorPassword &&
      password === secondPassword &&
      username &&
      password &&
      secondPassword
    );
  };

  useEffect(() => {
    if (errorUserName) {
      store.snackHolder(errorUserName);
      return;
    }
    if (errorPassword) {
      store.snackHolder(errorPassword);
      return;
    }
    if (errorSecondPassword) {
      store.snackHolder(errorSecondPassword);
      return;
    }
    store.setOpenSnack(false);
  }, [errors]);

  return (
    <div>
      <form className='auth__form' onSubmit={registr}>
        <p className='auth__form__paragraph'>Регистрация</p>
        <div className='auth__form__bodyForm'>
          <label className='auth__form__bodyForm_loginandpassword'>
            Логин:
            <input
              className={
                (errorUserName &&
                  "auth__form__bodyForm_loginandpassword__textfield wrongtextfield") ||
                "auth__form__bodyForm_loginandpassword__textfield"
              }
              type='text'
              placeholder='username'
              name='username'
              autoComplete='off'
              value={username}
              onChange={(e) => changeHandler(e.target.value, "username")}
              onBlur={blurHandler}
            />
          </label>

          <label className='auth__form__bodyForm_loginandpassword'>
            <span>Пароль:</span>
            <input
              className={
                (errorPassword &&
                  "auth__form__bodyForm_loginandpassword__textfield wrongtextfield") ||
                "auth__form__bodyForm_loginandpassword__textfield"
              }
              type={showPass}
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => changeHandler(e.target.value, "password")}
              onBlur={blurHandler}
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
              className={
                checkEqualPass()
                  ? "auth__form__bodyForm_loginandpassword__textfield "
                  : "auth__form__bodyForm_loginandpassword__textfield wrongtextfield"
              }
              type={showPass}
              name='secondPassword'
              placeholder='password'
              value={secondPassword}
              onChange={(e) => {
                changeHandler(e.target.value, "secondPassword");
              }}
              onBlur={blurHandler}
            />
          </label>
        </div>
        <div className='auth__form__botomblok'>
          <button
            disabled={!tryValidSetState() || !checkEqualPass()}
            className='auth__form__botomblok__submit'>
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
