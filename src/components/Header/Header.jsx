import { useContext } from "react";
import { Button } from "@mui/material";
import { Context } from "src/index";
import headlogo from "src/imgs/headlogo.svg";
import "./style.scss";

const Header = ({ headText, logout }) => {
  const store = useContext(Context);
  const goOut = async () => {
    await store.logout();
  };

  return (
    <header className='header'>
      <img src={headlogo} className='headlogo' alt='' />
      <h2 className='header__headtext'>{headText}</h2>
      {logout && (
        <Button onClick={goOut} variant='contained'>
          Bыход
        </Button>
      )}
    </header>
  );
};

export default Header;
