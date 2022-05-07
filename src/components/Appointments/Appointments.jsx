import { React } from "react";
import Button from "@mui/material/Button";
// import moment from "moment";
import Header from "components/Header/Header";
import "./appointments.scss";

const Appointments = () => {
  return (
    <>
      <Header headText={"приемы"} comOut={true} />
      <div className='appoint'>
        <div className='appoint__headwrapform'>
          <form className='appoint__form'>
            <label className='appoint__labl_flex'>
              Имя:
              <input type='text' />
            </label>
            <label className='appoint__labl_flex'>
              Врач:
              <input type='text' />
            </label>
            <label className='appoint__labl_flex'>
              Дата:
              <input type='text' />
            </label>
            <label className='appoint__labl_flex'>
              Жалобы:
              <input type='text' />
            </label>
            <label className='appoint__labl_flex'>
              <Button variant='contained'>Добавить</Button>
            </label>
          </form>
        </div>
        <div className='appoint__list'>
          <div className='appoint__column'>
            <ul className='appoint__requireditem'>
              <li className='appoint__headlist'>Имя</li>
              <li className='appoint__textvalue'>fdgfdgdfg</li>
            </ul>
            <ul className='appoint__requireditem'>
              <li className='appoint__headlist'>Врач</li>
              <li className='appoint__textvalue'>fdgfdgdfg</li>
            </ul>
            <ul className='appoint__requireditem'>
              <li className='appoint__headlist'>Дата</li>
              <li className='appoint__textvalue'>fdgfdgdfg</li>
            </ul>
            <ul className='appoint__requireditem'>
              <li className='appoint__headlist'>Жалобы</li>
              <li className='appoint__textvalue'>fdgfdgdfg</li>
            </ul>
            <ul className='appoint__requireditem'>
              <li className='appoint__headlist'></li>
              <li className='appoint__textvalue'>fdgfdgdfg</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
