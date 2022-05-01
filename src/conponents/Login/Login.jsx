import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import AssignmentLateTwoToneIcon from "@mui/icons-material/AssignmentLateTwoTone";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.scss";

const Login = () => {
  const [showPass, setShowPass] = useState("password");
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = e => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='auth__form flex WrapWrap relative'>
      <p className='auth__form__paragraph'>Войти в систему </p>
      <div className='auth__form__bodyForm flex WrapWrap absolute'>
        <span className='auth__form_loginandpasswd'>Логин:</span>
        {errors?.username && (
          <i className='auth__form__wrong'>
            <AssignmentLateTwoToneIcon />
            {errors?.username?.message || "Error!"}
          </i>
        )}
        <input
          className='auth__form__inpt'
          placeholder='username'
          autoComplete='off'
          {...register("username", {
            required: "Поле должно содержать минимум 2 символа",
            minLength: {
              value: 2,
              message: "минимум 2 символа",
            },
          })}
        />
        <span className='auth__form_loginandpasswd'>Пароль:</span>
        {errors?.password && (
          <i className='auth__form__wrong'>
            <AssignmentLateTwoToneIcon />
            {errors?.password?.message || "Error!"}
          </i>
        )}
        <input
          className='auth__form__inpt'
          type={showPass}
          name='password'
          placeholder='password'
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9]{6,15}$/,
              message: "латинские буквы и цифры",
            },
            minLength: {
              value: 6,
              message: " Минимум 6 символов",
            },
            maxLength: {
              value: 15,
              message: "15 символов вполне достаточно будет",
            },
          })}
        />
        <i
          title={
            showPass !== "text" ? "Показать пароль" : "Скрыть пароль"
          }
          onClick={() => {
            showPass !== "text"
              ? setShowPass("text")
              : setShowPass("password");
          }}
          className='auth__form_showPassword absolute'>
          {showPass !== "text" ? (
            <RemoveRedEyeIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </i>
      </div>
      <div className='auth__form__botBlck absolute'>
        <button
          type='submit'
          disabled={!isValid}
          className='auth__form__submit relative'>
          Вход
        </button>
        <Link to='/signup'>Зарегистрироваться</Link>
      </div>
    </form>
  );
};

export default Login;
