import Header from "./Header";
import Signup from "./Signup";
// import Login from "./Login";
import { Hospital } from "./Pics";
// import Records from "./Records";

const Authentication = ({ headText }) => {
  return (
    <div id='authentication'>
      <Header headText={headText} />
      {/* <Records /> */}
      <div className='flex' id='wrap'>
        <Hospital id='secLogo' />
        <Signup />
      </div>
    </div>
  );
};

export default Authentication;
