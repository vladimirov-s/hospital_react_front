import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsCookie from "js-cookie";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snack from "components/Snack/Snack";
import { url } from "components/helper/constants";
import {
  userNameValidate,
  passwValidate,
} from "components/helper/validate";
import "./style.scss";

const Login = () => {
  const nav = useNavigate();
  const [showPass, setShowPass] = useState("password");
  const [notice, setNotice] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [userfield, setUserField] = useState({
    username: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const register = (e) => {
    e.preventDefault();
    if (isValid) {
      const { username, password } = userfield;
      axios
        .post(`${url}/login`, {
          name: username,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("accesToken", res.data.token.accessToken);
          jsCookie.set("refreshToken", res.data.token.refreshToken);
          nav("/appointments");
        })
        .catch((err) => {
          setNotice("Login or password is wrong");
          setOpenSnack(true);
        });
    }
  };

  useEffect(() => {
    if (errors.password) {
      return setNotice(errors.password), setOpenSnack(true);
    }
    if (errors.username) {
      return setNotice(errors.username), setOpenSnack(true);
    }
    setOpenSnack(false);
  }, [errors]);

  const showPassfunction = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const blurHandler = (e) => {
    const candidate = e.target.name;
    const { username, password } = userfield;

    if (candidate === "username") {
      if (userNameValidate(username)) {
        setErrors({
          ...errors,
          username: "",
        });
      } else {
        setErrors({
          ...errors,
          username:
            "Поле Login должно быть от 6 символов, разрешены только латинские буквы",
        });
        setIsValid(false);
      }
    }
    if (candidate === "password") {
      if (passwValidate(password)) {
        setErrors({
          ...errors,
          password: "",
        });
      } else {
        setErrors({
          ...errors,
          password:
            "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
        });
        setIsValid(false);
      }
    }
    tryValidSetState();
  };

  const tryValidSetState = () => {
    const { username, password } = userfield;
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
                (errors?.username &&
                  "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              name='username'
              placeholder='username'
              autoComplete='off'
              onKeyUp={(e) =>
                setUserField({
                  ...userfield,
                  username: e.target.value,
                })
              }
              onBlur={blurHandler}
            />
          </label>
          <label className='auth__form_loginandpassword'>
            <span> Пароль:</span>
            <input
              className={
                (errors?.password &&
                  "auth__form__textfield wrongtextfield") ||
                "auth__form__textfield"
              }
              type={showPass}
              name='password'
              placeholder='password'
              onKeyUp={(e) =>
                setUserField({
                  ...userfield,
                  password: e.target.value,
                })
              }
              onBlur={blurHandler}
            />
            <i
              title={
                showPass !== "text" ? "Показать пароль" : "Скрыть пароль"
              }
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
          <button
            disabled={!isValid}
            className='auth__form__submit relative'>
            Вход
          </button>
          <Link className='auth__form_link' to='/signup'>
            Зарегистрироваться
          </Link>
        </div>
        <Snack
          open={openSnack}
          setOpen={setOpenSnack}
          severity='warning'
          message={notice}
        />
      </form>
    </div>
  );
};

export default Login;
