import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { toJS } from "mobx";
import { Button } from "@mui/material";
import { Context } from "src/index";
import { Hospital } from "src/imgs/pics";
import "./style.scss";

const Header = ({ headText, logout }) => {
  const store = useContext(Context);
  const location = useLocation().pathname;
  const goOut = async () => {
    await store.logout();
  };

  return (
    <header className='header'>
      <Hospital need='logo' />
      <h2 className='header__headtext'>{headText}</h2>
      {logout && (
        <Button onClick={goOut} variant='contained'>
          Bыход
        </Button>
      )}
      {toJS(store.isAuth) &&
        (location === "/login" || location === "/signup" ? (
          <Link className='header_navLink' to='/appointments'>
            Страница с записями
          </Link>
        ) : (
          <Link className='header_navLink' to='/login'>
            Авторизация
          </Link>
        ))}
    </header>
  );
};

export default observer(Header);
