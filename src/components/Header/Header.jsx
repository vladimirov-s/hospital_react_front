import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "src/helper/constants";
import { Button } from "@mui/material";
import { Hospital } from "src/pics";
import "./style.scss";

const Header = ({ headText, logout }) => {
  const navigator = useNavigate();
  const goOut = () => {
    axios.post(`${url}/logout`).then((res) => {
      navigator("/");
    });
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

export default Header;
