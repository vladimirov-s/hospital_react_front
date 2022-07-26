import { Context } from "src/index";
import { observer } from "mobx-react-lite";
import { React, useContext, useState } from "react";
import { Button } from "@mui/material";
import moment from "moment";
import { doctors } from "src/helper/constants";
import "./style.scss";

const ModalEdit = ({ id, setList }) => {
  const store = useContext(Context);
  const universalRegExp = /^[а-яА-Яa-zA-Z\s.]{2,30}$/;
  const date = store.stateFields.date;
  const { customer, doctor, complaint } = store.stateFields;
  const [appointment, setAppoint] = useState({
    customer,
    doctor,
    complaint,
  });

  const confirmHandler = async (id) => {
    let counter = 0;
    for (const key in appointment) {
      if (universalRegExp.test(String(appointment[key]))) {
        counter++;
      }

      if (counter === 3) {
        editAppoint(id);
        store.setTypeOfTask("");
      }
    }
    if (counter !== 3) {
      store.snackHolder(
        "Все поля должны быть заполнены. Допускаются большие и маленькие кириллические и латинские буквы, пробелы"
      );
    }
  };

  const editAppoint = async (id) => {
    await store.editAppoint(id, appointment, date);
    const appointments = await store.getAppointments();
    setList(appointments);
  };

  const cancelHandler = (e) => {
    if (e.target.dataset.close === "closeThis") {
      store.setTypeOfTask("");
    }
  };

  return (
    <div
      className='modal_substrate'
      data-close='closeThis'
      onClick={cancelHandler}>
      <div className='modal bigger'>
        <div className='modal_header'>
          <h1 className='modal_head_text'>Редактировать запись</h1>
        </div>
        <main className='modal_main'>
          <div className='modal_editForm'>
            <span className='modal_fieldTitle'>Пациент</span>
            <input
              className='modal_textFields'
              type='text'
              placeholder='Пациент'
              value={appointment.customer}
              onChange={(e) => {
                setAppoint({ ...appointment, customer: e.target.value });
              }}
            />
            <span className='modal_fieldTitle'>Доктор</span>
            <select
              className='modal_textFields'
              onChange={(e) => {
                setAppoint({ ...appointment, doctor: e.target.value });
              }}>
              <option value=''>{appointment.doctor}</option>
              {doctors?.map((element, idx) => (
                <option key={`elnt${idx}`} value={element.name}>
                  {element.name}
                </option>
              ))}
            </select>
            <span className='modal_fieldTitle'>Дата</span>
            <input
              className='modal_textFields'
              type='date'
              value={moment(date).format("YYYY-MM-DD")}
              onChange={(e) => store.setDate(e.target.value)}
            />
            <span className='modal_fieldTitle'>Жалобы</span>
            <textarea
              className='modal_textFields'
              placeholder='Текст жалобы на приеме'
              value={appointment.complaint}
              onChange={(e) => {
                setAppoint({ ...appointment, complaint: e.target.value });
              }}
            />
          </div>
        </main>
        <footer className='modal_footer'>
          <Button
            sx={{
              backgroundColor: "white",
            }}
            variant='outlined'
            data-close='closeThis'
            onClick={cancelHandler}>
            Отмена
          </Button>
          <Button variant='contained' onClick={() => confirmHandler(id)}>
            Подтвердить
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default observer(ModalEdit);
