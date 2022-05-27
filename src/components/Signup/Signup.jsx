import { observer } from "mobx-react-lite";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Context } from "src/index";
import { userNameValidate, passwValidate } from "src/helper/validate";
import "./style.scss";

const Signup = () => {
  const store = useContext(Context);
  const [showPass, setShowPass] = useState("password");
  const [userfield, setUserField] = useState({
    username: "",
    password: "",
    secondPassword: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    secondPassword: "",
  });

  const registr = (e) => {
    e.preventDefault();
    if (isValid) {
      const { username, password } = userfield;
      store.registration(username, password);
    }
  };

  const showPassfunction = () => {
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

  const blurHandler = (e) => {
    const candidate = e.target.name;
    const { username, password, secondPassword } = userfield;
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
    if (candidate === "secondPassword") {
      if (secondPassword === password) {
        errorHandler("", "secondPassword");
        setErrors({
          ...errors,
          secondPassword: "",
        });
      } else {
        errorHandler("Введённые пароли должны совпадать", "secondPassword");
        setIsValid(false);
      }
    }

    tryValidSetState();
  };

  const keyUpHandler = (text, type) => {
    setUserField({ ...userfield, [type]: text });
  };

  const tryValidSetState = () => {
    const { username, password, secondPassword } = userfield;
    if (
      !errors.password &&
      !errors.username &&
      !errors.secondPassword &&
      username &&
      password &&
      secondPassword
    ) {
      setIsValid(true);
    }
  };

  useEffect(() => {
    const { username, password, secondPassword } = errors;
    if (password) {
      callSnack(password);
      return;
    }
    if (username) {
      callSnack(username);
      return;
    }
    if (secondPassword) {
      callSnack(secondPassword);
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
                (errors?.username && "auth__form__textfield wrongtextfield") ||
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
                (errors?.password && "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              type={showPass}
              name='password'
              placeholder='password'
              value={userfield.password}
              onChange={(e) => keyUpHandler(e.target.value, "password")}
              onBlur={blurHandler}
            />
            <i
              title={showPass !== "text" ? "Показать пароль" : "Скрыть пароль"}
              onClick={() => showPassfunction()}
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
                (errors?.secondPassword &&
                  "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              type={showPass}
              name='secondPassword'
              placeholder='password'
              value={userfield.secondPassword}
              onChange={(e) => keyUpHandler(e.target.value, "secondPassword")}
              onBlur={blurHandler}
            />
          </label>
        </div>
        <div className='auth__form__botomblok'>
          <button disabled={!isValid} className='auth__form__submit'>
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
