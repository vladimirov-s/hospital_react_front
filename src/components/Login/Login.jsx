import { observer } from "mobx-react-lite";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Context } from "src/index";
import { userNameValidate, passwValidate } from "src/helper/validate";
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
    username: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();
    if (isValid) {
      const { username, password } = userField;
      await store.login(username, password);
    }
  };

  useEffect(() => {
    const { username, password } = errors;
    if (password) {
      callSnack(password);
      return;
    }
    if (username) {
      callSnack(username);
      return;
    }
    store.setOpenSnack(false);
  }, [errors]);

  const callSnack = (text) => {
    store.setMessage(text);
    store.setOpenSnack(true);
  };

  const showPassfunction = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const errorHandler = (msg, errName) => {
    setErrors({ ...errors, [errName]: msg });
  };

  const blurHandler = (e) => {
    const candidate = e.target.name;
    const { username, password } = userField;

    if (candidate === "username") {
      if (userNameValidate(username)) {
        errorHandler("", "username");
      } else {
        errorHandler(
          "Поле Login должно быть от 6 символов, разрешены только латинские буквы",
          "username"
        );
        setIsValid(false);
      }
    }
    if (candidate === "password") {
      if (passwValidate(password)) {
        errorHandler("", "password");
      } else {
        errorHandler(
          "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
          "password"
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
    const { username, password } = userField;
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
                (errors?.username && "auth__form__textfield wrongtextfield") ||
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
                (errors?.password && "auth__form__textfield wrongtextfield") ||
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
              onClick={showPassfunction}
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
          <button disabled={!isValid} className='auth__form__submit relative'>
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
