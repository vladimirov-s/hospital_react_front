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
    errUsername: "",
    errPassword: "",
    errSecondPassword: "",
  });
  const { username, password, secondPassword } = userfield;
  const { errUsername, errPassword, errSecondPassword } = errors;
  const registr = (e) => {
    e.preventDefault();
    if (tryValidSetState) {
      store.registration(username, password);
    }
  };

  const showPasswort = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const callSnack = (text) => {
    store.setMessage(text);
    store.setOpenSnack(true);
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
    if (password === secondPassword) {
      return true;
    } else {
      return false;
    }
  };

  const blurHandler = (e) => {
    const candidate = e.target.name;

    if (candidate === "username") {
      if (userNameValidate(username)) {
        errorHandler("", "errUsername");
      } else {
        errorHandler(
          "Поле Login должно быть от 6 символов, разрешены только латинские буквы",
          "errUsername"
        );
      }
    }

    if (candidate === "password") {
      if (passwordValidate(password)) {
        errorHandler("", "errPassword");
      } else {
        errorHandler(
          "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
          "errPassword"
        );
      }
    }
    if (candidate === "secondPassword" && secondPassword === password) {
      errorHandler("", "errSecondPassword");
    }

    if (candidate === "secondPassword" && secondPassword !== password) {
      errorHandler("Введённые пароли должны совпадать", "errSecondPassword");
    }

    tryValidSetState();
  };

  const keyUpHandler = (text, type) => {
    setUserField({ ...userfield, [type]: text });
  };

  const tryValidSetState = () => {
    if (
      !errUsername &&
      !errPassword &&
      password === secondPassword &&
      username &&
      password &&
      secondPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (errUsername) {
      callSnack(errUsername);
      return;
    }
    if (errPassword) {
      callSnack(errPassword);
      return;
    }
    if (errSecondPassword) {
      callSnack(errSecondPassword);
      return;
    }
    store.setOpenSnack(false);
  }, [errors]);

  return (
    <div>
      <form className='auth__form' onSubmit={registr}>
        <p className='auth__form__paragraph'>Регистрация</p>
        <div className='auth__form__bodyForm'>
          <label className='auth__form_loginandpassword'>
            Логин:
            <input
              className={
                (errUsername && "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              type='text'
              placeholder='username'
              name='username'
              autoComplete='off'
              value={userfield.username}
              onChange={(e) => keyUpHandler(e.target.value, "username")}
              onBlur={blurHandler}
            />
          </label>

          <label className='auth__form_loginandpassword'>
            <span>Пароль:</span>
            <input
              className={
                (errPassword && "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              type={showPass}
              name='password'
              placeholder='password'
              value={password}
              onChange={(e) => keyUpHandler(e.target.value, "password")}
              onBlur={blurHandler}
            />
            <i
              title={showPass !== "text" ? "Показать пароль" : "Скрыть пароль"}
              onClick={() => showPasswort()}
              className='auth__form_showPassword'>
              {showPass !== "text" ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </i>
          </label>

          <label className='auth__form_loginandpassword'>
            Повторите пароль:
            <input
              className={
                checkEqualPass()
                  ? "auth__form__textfield "
                  : "auth__form__textfield wrongtextfield"
              }
              type={showPass}
              name='secondPassword'
              placeholder='password'
              value={userfield.secondPassword}
              onChange={(e) => {
                keyUpHandler(e.target.value, "secondPassword");
              }}
              onBlur={blurHandler}
            />
          </label>
        </div>
        <div className='auth__form__botomblok'>
          <button
            disabled={!tryValidSetState() || !checkEqualPass()}
            className='auth__form__submit'>
            Зарегистрироваться
          </button>
          <Link className='auth__form_link' to='/'>
            Авторизоваться
          </Link>
        </div>
      </form>
    </div>
  );
};

export default observer(Signup);
