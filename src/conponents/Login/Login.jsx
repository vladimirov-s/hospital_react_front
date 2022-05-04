import { useState, useEffect } from "react";
import Snack from "../Snack/Snack";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.scss";

const Login = () => {
  const [showPass, setShowPass] = useState("password");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = e => {};
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
    const temp = e.target.name;
    console.log(errors);
    switch (temp) {
      case "username":
        const reg = /^[a-zA-Z]{2,20}$/;
        if (!reg.test(String(username))) {
          setErrors({
            ...errors,
            username:
              "Поле Login должно быть от 2 символов, разрешены только латинские буквы",
          });
          setIsValid(false);
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
        if (!regForPass.test(String(password))) {
          setErrors({
            ...errors,
            password:
              "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
          });
          setIsValid(false);
          break;
        } else {
          setErrors(username, {
            ...errors,
            password: "",
          });
        }
      default:
        setIsValid(true);
    }
  };

  return (
    <form
      onSubmit={() => onSubmit()}
      className='auth__form flex WrapWrap relative'>
      <p className='auth__form__paragraph'>Войти в систему </p>
      <div className='auth__form__bodyForm flex WrapWrap absolute'>
        <label className='auth__form_loginandpassword flex WrapWrap'>
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
            onKeyUp={e => setUsername(e.target.value)}
            onBlur={e => blurHandler(e)}
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
            onBlur={e => blurHandler(e)}
          />
        </label>
        <i
          title={
            showPass !== "text" ? "Показать пароль" : "Скрыть пароль"
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
          type='submit'
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
