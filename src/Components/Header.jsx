import { Hospital } from "./Pics";
const Header = ({ headText }) => {
  return (
    <header>
      <Hospital id='logo' />
      <h2>{headText}</h2>
    </header>
  );
};

export default Header;
