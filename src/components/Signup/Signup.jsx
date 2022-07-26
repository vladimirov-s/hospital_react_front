import { observer } from "mobx-react-lite";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Context } from "src/index";
import { userNameValidate, passwordValidate } from "src/helper/validate";
import "./style.scss";

const Signup = () => {
  const store = useContext(Context);
  const [showPass, setShowPass] = useState("password");
  const [userField, setUserField] = useState({
    username: "",
    password: "",
    secondPassword: "",
  });

  const showPassword = () => {
    showPass !== "text" ? setShowPass("text") : setShowPass("password");
  };

  const blurHandler = (e) => {
    e.preventDefault();
    if (!userNameValidate(userField.username)) {
      store.snackHolder(
        "Поле Login должно быть от 6 символов, разрешены только латинские буквы"
      );
      return;
    }

    if (!passwordValidate(userField.password)) {
      store.snackHolder(
        "Пароль должен быть от 6 до 12 символов латинские буквы и цифры"
      );
      return;
    }

    if (userField.secondPassword !== userField.password) {
      store.snackHolder("Введённые пароли должны совпадать");
      return;
    }
    store.registration(userField.username, userField.password);
  };

  const changeHandler = (text, type) => {
    setUserField({ ...userField, [type]: text });
  };

  return (
    <div>
      <form className='auth_form' onSubmit={blurHandler}>
        <p className='auth_form_paragraph'>Регистрация</p>
        <div className='auth_form_bodyForm'>
          <label className='auth_form_bodyForm_loginandpassword'>
            Логин:
            <input
              className='auth_form_bodyForm_loginandpassword_textfield'
              type='text'
              placeholder='username'
              name='username'
              autoComplete='off'
              value={userField.username}
              onChange={(e) => changeHandler(e.target.value, "username")}
            />
          </label>

          <label className='auth_form_bodyForm_loginandpassword'>
            <span>Пароль:</span>
            <input
              className='auth_form_bodyForm_loginandpassword_textfield'
              type={showPass}
              name='password'
              placeholder='password'
              value={userField.password}
              onChange={(e) => changeHandler(e.target.value, "password")}
            />
            <i
              title={showPass !== "text" ? "Показать пароль" : "Скрыть пароль"}
              onClick={showPassword}
              className='auth_form_bodyForm_loginandpassword_showPassword'>
              {showPass !== "text" ? (
                <RemoveRedEyeIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </i>
          </label>

          <label className='auth_form_bodyForm_loginandpassword'>
            Повторите пароль:
            <input
              className='auth_form_bodyForm_loginandpassword_textfield'
              type={showPass}
              name='secondPassword'
              placeholder='password'
              value={userField.secondPassword}
              onChange={(e) => {
                changeHandler(e.target.value, "secondPassword");
              }}
            />
          </label>
        </div>
        <div className='auth_form_botomblok'>
          <button className='auth_form_botomblok_submit'>
            Зарегистрироваться
          </button>
          <Link className='auth_form_botomblok_link' to='/'>
            Авторизоваться
          </Link>
        </div>
      </form>
    </div>
  );
};

export default observer(Signup);
