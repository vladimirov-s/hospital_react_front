import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snack from "/home/user/sergeech/hospital_react_front/src/components/Snack/Snack";
import "./signup.scss";

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

  const onSubmit = e => {
    if (isValid) {
      axios({
        method: "POST",
        url: "http://localhost:5001/api/registration",
        data: {
          name: userfield.username,
          password: userfield.password,
        },
      }).then(res => {
        console.log(res);
      });
    }
  };

  const showPassfunction = () => {
    showPass !== "text"
      ? setShowPass("text")
      : setShowPass("password");
  };

  const blurHandler = e => {
    const candidate = e.target.name;
    switch (candidate) {
      case "username":
        const reg = /^[a-zA-Z]{6,20}$/;
        if (!reg.test(String(userfield.username))) {
          setErrors({
            ...errors,
            username:
              "Поле Login должно быть от 6 символов, разрешены только латинские буквы",
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
        if (!regForPass.test(String(userfield.password))) {
          setErrors({
            ...errors,
            password:
              "Пароль должен быть от 6 до 12 символов латинские буквы и цифры",
          });
          setIsValid(false);
          break;
        } else {
          setErrors({
            ...errors,
            password: "",
          });
        }
      case "secondPassword":
        if (userfield.password !== userfield.secondPassword) {
          setErrors({
            ...errors,
            secondPassword: "Введённые пароли должны совпадать",
          });
          setIsValid(false);
        } else {
          setErrors({
            ...errors,
            secondPassword: "",
          });
        }
      default:
        tryValidSetState();
    }
  };

  const tryValidSetState = () => {
    if (
      !errors.password &&
      !errors.username &&
      !errors.secondPassword &&
      userfield.username &&
      userfield.password &&
      userfield.secondPassword
    ) {
      setIsValid(true);
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

  return (
    <form className='auth__form flex flwrap relative'>
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
              setUserField({ ...userfield, username: e.target.value })
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
            onChange={e =>
              setUserField({ ...userfield, password: e.target.value })
            }
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
            onChange={e =>
              setUserField({
                ...userfield,
                secondPassword: e.target.value,
              })
            }
            onBlur={e => blurHandler(e)}
          />
        </label>
      </div>
      <div className='auth__form__botomblok absolute'>
        <button
          disabled={!isValid}
          onClick={() => onSubmit}
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
