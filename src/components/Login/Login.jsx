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
    errUsername: "",
    errPassword: "",
  });
  const { errUsername, errPassword } = errors;
  const { username, password } = userField;

  const register = async (e) => {
    e.preventDefault();
    if (isValid) {
      await store.login(username, password);
    }
  };

  useEffect(() => {
    if (errPassword) {
      callSnack(errPassword);
      return;
    }
    if (errUsername) {
      callSnack(errUsername);
      return;
    }
    store.setOpenSnack(false);
  }, [errors]);

  const callSnack = (text) => {
    store.setMessage(text);
    store.setOpenSnack(true);
  };

  const showPassJobber = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const errorHandler = (msg, errName) => {
    setErrors({ ...errors, [errName]: msg });
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
        setIsValid(false);
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
        setIsValid(false);
      }
    }

    tryValidSetState();
  };

  const keyUpHandler = (text, type) => {
    setUserField({ ...userField, [type]: text });
  };

  const tryValidSetState = () => {
    if (!errors.password && !errors.username && username && password) {
      setIsValid(true);
    }
  };

  return (
    <div>
      <form onSubmit={register} className='auth__form'>
        <p className='auth__form__paragraph'>Войти в систему </p>
        <div className='auth__form__bodyForm'>
          <label className='auth__form_loginandpassword'>
            Логин:
            <input
              className={
                (errUsername && "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              name='username'
              placeholder='username'
              autoComplete='off'
              onKeyUp={(e) => keyUpHandler(e.target.value, "username")}
              onBlur={blurHandler}
            />
          </label>
          <label className='auth__form_loginandpassword'>
            <span> Пароль:</span>
            <input
              className={
                (errPassword && "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              type={showPass}
              name='password'
              placeholder='password'
              onKeyUp={(e) => keyUpHandler(e.target.value, "password")}
              onBlur={blurHandler}
            />
            <i
              title={showPass !== "text" ? "Показать пароль" : "Скрыть пароль"}
              onClick={showPassJobber}
              className='auth__form_showPassword'>
              {showPass !== "text" ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </i>
          </label>
        </div>
        <div className='auth__form__botomblok'>
          <button disabled={!isValid} className='auth__form__submit'>
            Вход
          </button>
          <Link className='auth__form_link' to='/signup'>
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
};

export default observer(Login);
