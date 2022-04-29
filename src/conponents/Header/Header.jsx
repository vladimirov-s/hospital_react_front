import { Hospital } from "./../Pics";
import "./header.scss";

const Header = ({ headText }) => {
  return (
    <header className='header'>
      <Hospital need='logo' />
      <h2 className='header__h2'>{headText}</h2>
    </header>
  );
};

export default Header;
