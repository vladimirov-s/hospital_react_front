import Snack from "../Snack/Snack";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./signup.scss";

const Signup = () => {
  const [showPass, setShowPass] = useState("password");
  const [notice, setNotice] = useState("");
  const [secondPass, setSecondPass] = useState("");
  const [open, setOpen] = useState(false);
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

  const showPassfunction = () => {
    showPass !== "text"
      ? setShowPass("text")
      : setShowPass("password");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            autoComplete='off'
            {...register("username", {
              required:
                "Поле username должно содержать минимум 2 символа",
              minLength: {
                value: 2,
                message: "минимум 2 символа",
              },
            })}
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
            placeholder='password'
            {...register("password", {
              required: "Это поле надо бы заполнить",
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
            placeholder='password'
            onBlur={e => {
              if (e.target.value !== errors.password) {
              }
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
