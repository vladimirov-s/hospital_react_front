import { Context } from "src/index";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button } from "@mui/material";
import { Hospital } from "src/imgs/pics";
import "./style.scss";

const Header = ({ headText, logout }) => {
  const store = useContext(Context);

  const goOut = async () => {
    await store.logout();
  };

  return (
    <header className='header'>
      <Hospital need='logo' />
      <h2 className='header__headtext'>{headText}</h2>
      {logout ? (
        <Button onClick={goOut} variant='contained'>
          Bыход
        </Button>
      ) : (
        false
      )}
    </header>
  );
};

export default observer(Header);
