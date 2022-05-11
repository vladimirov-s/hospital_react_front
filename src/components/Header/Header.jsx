import { Button } from "@mui/material";
import axios from "axios";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { url } from "components/helper/constAndValidate";
import { Hospital } from "../pics";
import "./header.scss";

const Header = ({ headText, logout }) => {
  const nav = useNavigate();
  const goOut = () => {
    const accessToken = localStorage.getItem("accesToken");
    const refreshToken = jsCookie.get("refreshToken");
    console.log(refreshToken);
    axios
      .post(`${url}/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log(res.data);
        nav("/");
      })
      .catch(err => console.error(err));
  };

  return (
    <header className='header'>
      <Hospital need='logo' />
      <h2 className='header__headtext'>{headText}</h2>
      {logout ? (
        <Button onClick={goOut} variant='contained'>
          выход
        </Button>
      ) : (
        false
      )}
    </header>
  );
};

export default Header;
