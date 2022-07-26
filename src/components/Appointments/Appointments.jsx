import { observer } from "mobx-react-lite";
import { React, useState, useContext, useEffect } from "react";
import Snack from "components/Snack/Snack";
import Header from "components//Header/Header";
import CreateAppoint from "components/CreateAppoint/CreateAppoint";
import ModalDelete from "components/ModalDelete/ModalDelete";
import { Context } from "src/index";
import ModalEdit from "components/ModalEdit/ModalEdit";
import FiltrVisit from "components/FiltrVisit/FiltrVisit";
import TableAppointments from "components/TableAppointments/TableAppointments";
import "./style.scss";

const Appointments = () => {
  const store = useContext(Context);
  const [id, setId] = useState("");
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const temp = await store.getAppointments();
    setList(temp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header headText={"приемы"} logout={true} />

      <div className='appoint'>
        <CreateAppoint setList={setList} />
        <FiltrVisit setList={setList} />
        <div className='appoint__list'>
          <div className='appoint__column'>
            <table className='appoint_table'>
              <thead className='appoint__column'>
                <tr className='appoint__requireditem'>
                  <th className='appoint__headlist'>Имя</th>
                  <th className='appoint__headlist'>Врач</th>
                  <th className='appoint__headlist'>Дата</th>
                  <th className='appoint__headlist'>Жалобы</th>
                  <th className='appoint__headlist'></th>
                </tr>
              </thead>
              <tbody className='appoint__column'>
                {list?.map((item, index) => (
                  <TableAppointments
                    setId={setId}
                    visit={item}
                    key={`visit${index}`}
                    setList={setList}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {store.typeOfTask === "delet" && (
        <ModalDelete setList={setList} id={id} />
      )}
      {store.typeOfTask === "edit" && <ModalEdit setList={setList} id={id} />}
      <Snack />
    </>
  );
};

export default observer(Appointments);
