import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snack from "components/Snack/Snack";
import {
  url,
  userNameValidate,
  passwValidate,
} from "components/helper/constAndValidate";
import "./login.scss";

const Login = () => {
  const nav = useNavigate();
  const [showPass, setShowPass] = useState("password");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [userfield, setUserField] = useState({
    username: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const onSubmit = e => {
    e.preventDefault();
    if (isValid) {
      const { username, password } = userfield;
      axios
        .post(`${url}/login`, {
          name: username,
          password: password,
        })
        .then(res => {
          console.log(res.data.token);
          localStorage.setItem(
            "accesToken",
            res.data.token.accessToken
          );
          nav("/appointments");
        })
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    if (errors.password) {
      setNotice(errors.password);
      setOpen(true);
    } else if (errors.username) {
      setNotice(errors.username);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [errors]);

  const showPassfunction = () => {
    showPass !== "text"
      ? setShowPass("text")
      : setShowPass("password");
  };

  const blurHandler = e => {
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
    if (
      !errors.password &&
      !errors.username &&
      username &&
      password
    ) {
      setIsValid(true);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='auth__form flex flwrap relative'>
      <p className='auth__form__paragraph'>Войти в систему </p>
      <div className='auth__form__bodyForm flex flwrap absolute'>
        <label className='auth__form_loginandpassword flex flwrap'>
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
            onKeyUp={e =>
              setUserField({
                ...userfield,
                username: e.target.value,
              })
            }
            onBlur={e => blurHandler(e)}
          />
        </label>
        <label className='auth__form_loginandpassword flex flwrap relative'>
          Пароль:
          <input
            className={
              (errors?.password &&
                "auth__form__textfield wrongtextfield") ||
              "auth__form__textfield"
            }
            type={showPass}
            name='password'
            placeholder='password'
            onKeyUp={e =>
              setUserField({
                ...userfield,
                password: e.target.value,
              })
            }
            onBlur={e => blurHandler(e)}
          />
        </label>
        <i
          title={
            showPass !== "text"
              ? "Показать пароль"
              : "Скрыть пароль"
          }
          onClick={() => showPassfunction()}
          className='auth__form_showPassword absolute'>
          {showPass !== "text" ? (
            <RemoveRedEyeIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </i>
      </div>
      <div className='auth__form__botomblok absolute'>
        <button
          disabled={!isValid}
          className='auth__form__submit relative'>
          Вход
        </button>
        <Link to='/signup'>Зарегистрироваться</Link>
      </div>
      <Snack
        open={open}
        setOpen={setOpen}
        severity='warning'
        message={notice}
      />
    </form>
  );
};

export default Login;
