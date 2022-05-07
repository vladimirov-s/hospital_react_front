import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snack from "components/Snack/Snack";
import "./signup.scss";
import {
  url,
  userNameValidate,
  passwValidate,
} from "components/helper/constAndValidate";

const Signup = () => {
  const nav = useNavigate();
  const [showPass, setShowPass] = useState("password");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
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

  const registr = e => {
    e.preventDefault();
    if (isValid) {
      const { username, password } = userfield;
      axios
        .post(`${url}/registration`, {
          name: username,
          password: password,
        })
        .then(res => {
          console.log(res);
          localStorage.setItem(
            "accesToken",
            res.data.token.accessToken
          );
          nav("/appointments");
        })
        .catch(err => console.error(err));
    }
  };

  const showPassfunction = () => {
    showPass !== "text"
      ? setShowPass("text")
      : setShowPass("password");
  };

  const blurHandler = e => {
    const candidate = e.target.name;
    const { username, password, secondPassword } = userfield;
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
    if (candidate === "secondPassword") {
      if (secondPassword === password) {
        setErrors({
          ...errors,
          secondPassword: "",
        });
      } else {
        setErrors({
          ...errors,
          secondPassword: "Введённые пароли должны совпадать",
        });
        setIsValid(false);
      }
    }

    tryValidSetState();
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
      setNotice(password);
      setOpen(true);
    } else if (username) {
      setNotice(username);
      setOpen(true);
    } else if (secondPassword) {
      setNotice(secondPassword);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [errors]);

  return (
    <form
      className='auth__form flex flwrap relative'
      onSubmit={registr}>
      <p className='auth__form__paragraph'>Регистрация</p>
      <div className='auth__form__bodyForm flex flwrap absolute'>
        <label className='auth__form_loginandpassword flex flwrap'>
          Логин:
          <input
            className={
              (errors?.username &&
                "auth__form__textfield wrongtextfield") ||
              "auth__form__textfield"
            }
            type='text'
            placeholder='username'
            name='username'
            autoComplete='off'
            value={userfield.username}
            onChange={e =>
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
            value={userfield.password}
            onChange={e => {
              setUserField({
                ...userfield,
                password: e.target.value,
              });
            }}
            onBlur={e => blurHandler(e)}
          />
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
        </label>

        <label className='auth__form_loginandpassword flex flwrap'>
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
            onChange={e => {
              setUserField({
                ...userfield,
                secondPassword: e.target.value,
              });
            }}
            onBlur={e => blurHandler(e)}
          />
        </label>
      </div>
      <div className='auth__form__botomblok absolute'>
        <button
          disabled={!isValid}
          className='auth__form__submit relative'>
          Зарегистрироваться
        </button>
        <Link to='/'> Авторизоваться </Link>
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

export default Signup;
