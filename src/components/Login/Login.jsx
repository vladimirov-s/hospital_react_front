import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
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
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    errorUserName: "",
    errorPassword: "",
  });
  const { errorUserName, errorPassword } = errors;
  const { username, password } = userField;

  const changeHandler = (text, type) => {
    setUserField({ ...userField, [type]: text });
  };

  useEffect(() => {
    if (errorPassword) {
      store.snackHolder(errorPassword);
      return;
    }
    if (errorUserName) {
      store.snackHolder(errorUserName);
      return;
    }
    store.setOpenSnack(false);
  }, [errors]);

  const showPassJobber = (e) => {
    showPass === "text" ? setShowPass("password") : setShowPass("text");
  };

  const errorHandler = (msg, errName) => {
    setErrors({ ...errors, [errName]: msg });
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
        setIsValid(false);
      }
    }

    if (candidate === "password") {
      if (passwordValidate(password)) {
        errorHandler(null, "errorPassword");
      } else {
        errorHandler(
          "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
          "errorPassword"
        );
        setIsValid(false);
      }
    }

    tryValidSetState();
  };

  const tryValidSetState = () => {
    if (!errors.password && !errors.username && username && password) {
      setIsValid(true);
    }
  };

  const register = (e) => {
    e.preventDefault();
    if (isValid) {
      store.login(username, password);
    }
  };

  return (
    <div>
      <form onSubmit={register} className='auth__form'>
        <p className='auth__form__paragraph'>Войти в систему </p>
        <div className='auth__form__bodyForm'>
          <label className='auth__form__bodyForm_loginandpassword'>
            Логин:
            <input
              className={
                (errorUserName &&
                  "auth__form__bodyForm_loginandpassword__textfield wrongtextfield") ||
                "auth__form__bodyForm_loginandpassword__textfield"
              }
              name='username'
              placeholder='username'
              autoComplete='off'
              onChange={(e) => changeHandler(e.target.value, "username")}
              onBlur={blurHandler}
            />
          </label>
          <label className='auth__form__bodyForm_loginandpassword'>
            <span> Пароль:</span>
            <input
              className={
                (errorPassword &&
                  "auth__form__bodyForm_loginandpassword__textfield wrongtextfield") ||
                "auth__form__bodyForm_loginandpassword__textfield"
              }
              type={showPass}
              name='password'
              placeholder='password'
              onChange={(e) => changeHandler(e.target.value, "password")}
              onBlur={blurHandler}
            />
            <i
              title={showPass === "text" ? "Скрыть пароль" : "Показать пароль"}
              onClick={showPassJobber}
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
          <button disabled={!isValid} className='auth__form__botomblok__submit'>
            Вход
          </button>
          <Link className='auth__form__botomblok_link' to='/signup'>
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
};

export default observer(Login);
