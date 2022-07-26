import { observer } from "mobx-react-lite";
import { Context } from "src/index";
import { useContext } from "react";
import Button from "@mui/material/Button";
import "./style.scss";

const ModalDelete = ({ id, setList }) => {
  const store = useContext(Context);

  const confirmHandler = async (id) => {
    const temp = await store.deleteAppointment(id);
    setList(temp);
    store.setTypeOfTask("");
  };

  const cancelHandler = () => {
    store.setTypeOfTask("");
  };

  return (
    <div className='modal_substrate' onClick={cancelHandler}>
      <div className='modal'>
        <div className='modal_header'>
          <h1 className='modal_head_text'>Удалить прием</h1>
        </div>
        <main className='modal_main'>
          <h3 className='modal_main_text'>
            Вы действительно хотите удалить прием?
          </h3>
        </main>
        <footer className='modal_footer'>
          <Button
            sx={{
              backgroundColor: "white",
            }}
            variant='outlined'
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

export default observer(ModalDelete);
