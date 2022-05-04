// import Snack from "../Snack/Snack";
import { useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./signup.scss";

const Signup = () => {
  const [showPass, setShowPass] = useState("password");
  // const [notice, setNotice] = useState("");
  // const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    secondPassword: "",
  });

  const onSubmit = e => {
    console.log(e);
  };

  const showPassfunction = () => {
    showPass !== "text"
      ? setShowPass("text")
      : setShowPass("password");
  };

  const blurHandler = () => {
    console.log(
      `username-${username}`,
      `username-${username}`,
      `password- ${password}`
    );

    for (const key in errors) {
      console.log(key);
      switch (key) {
        case "username":
          const reg = /^[a-zA-Z0-9]{2,20}$/;
          if (!reg.test(String(key))) {
            setErrors({
              ...errors,
              username:
                "Поле Login должно быть от 2 символов, разрешены только латинские буквы",
            });
            break;
          } else {
            setErrors({
              ...errors,
              username: "",
            });
          }
          break;
        case "password":
          const regForPass = /^[a-zA-Z0-9]{6,12}$/;
          if (
            !regForPass.test(String(key)) &&
            password === secondPassword
          ) {
            setErrors({
              ...errors,
              password:
                "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
            });
            break;
          } else {
            setErrors(username, {
              ...errors,
              password: "",
            });
          }
        case "secondPassword":
          if (password !== secondPassword) {
            setErrors({
              ...errors,
              password: "Введённые пароли должны совпадать",
            });
            break;
          } else {
            setErrors({
              ...errors,
              password: "",
            });
          }
        default:
      }
    }
    onSubmit(errors);
  };

  return (
    <form
      onSubmit={() => onSubmit}
      className='auth__form flex WrapWrap relative'
      id='signup'>
      <p className='auth__form__paragraph'>Регистрация</p>
      <div className='auth__form__bodyForm flex WrapWrap absolute'>
        <label className='auth__form_loginandpassword flex WrapWrap'>
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
            onKeyUp={e => setUsername(e.target.value)}
            onBlur={() => blurHandler()}
          />
        </label>

        <label className='auth__form_loginandpassword flex WrapWrap relative'>
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
            onKeyUp={e => setPassword(e.target.value)}
            onBlur={() => blurHandler()}
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

        <label className='auth__form_loginandpassword flex WrapWrap'>
          Повторите пароль:
          <input
            className={
              (errors?.password &&
                "auth__form__textfield wrongtextfield") ||
              "auth__form__textfield"
            }
            type={showPass}
            name='secondPassword'
            placeholder='password'
            onKeyUp={e => setSecondPassword(e.target.value)}
            onBlur={() => {
              blurHandler();
            }}
          />
        </label>
      </div>
      <div className='auth__form__botomblok absolute'>
        <button
          type='submit'
          disabled={!isValid}
          className='auth__form__submit relative'>
          Зарегистрироваться
        </button>
        <Link to='/'> Авторизоваться </Link>
      </div>
      {/* <Snack
        open={open}
        setOpen={setOpen}
        severity='warning'
        message={notice}
      /> */}
    </form>
  );
};

export default Signup;
