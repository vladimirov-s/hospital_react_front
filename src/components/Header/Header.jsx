import { Hospital } from "../pics";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "components/helper/constAndValidate";
import "./header.scss";

const Header = ({ headText, comOut }) => {
  const nav = useNavigate();
  const goOut = () => {
    const accessToken = localStorage.getItem("accesToken");
    console.log(accessToken);
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
    <header className='header flex'>
      <Hospital need='logo' />
      <h2 className='header__headtext'>{headText}</h2>
      {comOut ? (
        <Button onClick={() => goOut()} variant='contained'>
          выход
        </Button>
      ) : (
        false
      )}
    </header>
  );
};

export default Header;
