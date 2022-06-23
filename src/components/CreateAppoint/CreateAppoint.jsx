import moment from "moment";
import { Context } from "src/index";
import { React, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { doctors } from "src/helper/constants";
import "./style.scss";

const CreateAppointment = ({ setList }) => {
  const store = useContext(Context);
  moment.locale("ru");
  const universalRegExp = /^[а-яА-Яa-zA-Z\s]{2,30}$/;
  const [appoint, setAppoint] = useState({
    customer: "",
    doctor: "",
    complaint: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
  });

  const checkValidFields = (e) => {
    let counter = 0;
    for (const key in appoint) {
      if (key !== "date" && universalRegExp.test(String(appoint[key]))) {
        counter++;
      }
    }

    if (counter === 3) {
      createAppointment();
    }

    if (counter !== 3) {
      store.snackHolder(
        "Все поля должны быть заполнены. Допускаются большие и маленькие кириллические и латинские буквы, пробелы"
      );
    }
  };

  const createAppointment = async () => {
    const temp = await store.createAppont(appoint);
    setList(temp.data);
    setAppoint({ ...appoint, customer: "", doctor: "", complaint: "" });
  };

  return (
    <div className='create__headwrapform'>
      <form className='create__form'>
        <label className='create__labl_flex'>
          Имя:
          <input
            className='create_field'
            type='text'
            placeholder='Пациент'
            name='customer'
            value={appoint.customer}
            onChange={(e) => {
              setAppoint({
                ...appoint,
                customer: e.target.value,
              });
            }}
          />
        </label>
        <label className='create__labl_flex'>
          Врач:
          <select
            name='doctor'
            className='create_field'
            onChange={(e) => {
              setAppoint({
                ...appoint,
                doctor: e.target.value,
              });
            }}>
            <option value=''></option>
            {doctors?.map((element, idx) => (
              <option key={`elem${idx}`} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>
        </label>
        <label className='create__labl_flex'>
          <span> Дата: </span>
          <input
            className='create_field'
            type='date'
            name='date'
            value={appoint.date}
            onChange={(e) => {
              setAppoint({
                ...appoint,
                date: e.target.value,
              });
            }}
          />
        </label>
        <label className='create__labl_flex'>
          Жалобы:
          <input
            className='create_field'
            type='text'
            name='complaint'
            placeholder='Жалобы'
            value={appoint.complaint}
            onChange={(e) => {
              setAppoint({
                ...appoint,
                complaint: e.target.value,
              });
            }}
          />
        </label>
        <label className='create__labl_flex'>
          <Button variant='contained' onClick={checkValidFields}>
            Добавить
          </Button>
        </label>
      </form>
    </div>
  );
};

export default CreateAppointment;
