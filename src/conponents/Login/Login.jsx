import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import AssignmentLateTwoToneIcon from "@mui/icons-material/AssignmentLateTwoTone";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
    console.log(errors);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex WrapWrap posR'
      id='login'>
      <p className='pfzinz'>Войти в систему </p>
      <div className='flex WrapWrap posA' id='bdfrm'>
        <span>Логин:</span>
        {errors?.username && (
          <i className='wrong'>
            <AssignmentLateTwoToneIcon />
            {errors?.username?.message || "Error!"}
          </i>
        )}
        <input
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
        <span>Пароль:</span>
        {errors?.password && (
          <i className='wrong'>
            <AssignmentLateTwoToneIcon />
            {errors?.password?.message || "Error!"}
          </i>
        )}
        <input
          type={showPass}
          name='password'
          placeholder='Пароль'
          {...register("password", {
            required: "минимум 4 символа",
            pattern: {
              value: /^[a-zA-Z0-9]{4,15}$/,
              message: "латинские буквы и цифры",
            },
            minLength: {
              value: 4,
              message: " латинские буквы или цифры",
            },
            maxLength: {
              value: 15,
              message: "15 символов вполне достаточно будет",
            },
          })}
        />
        <i
          title='Показать пароль'
          onClick={() => {
            showPass !== "text" ? setShowPass("text") : setShowPass("password");
          }}
          className='posA'
          id='showPassword'>
          {showPass !== "text" ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </i>
      </div>
      <div className='botBlck posA'>
        <button type='submit' disabled={!isValid} className='posR'>
          Вход
        </button>
        <Link to='/signup'> Зарегистрироваться </Link>
      </div>
    </form>
  );
};

export default Login;
