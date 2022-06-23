import { Context } from "src/index";
import { React, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import "./style.scss";

const TableAppointments = ({ visit, setList, setId }) => {
  const store = useContext(Context);
  const { _id, customerName, doctorName, date, complaint } = visit;

  const deleteHandler = async (id) => {
    store.setTypeOfTask("delet");
    setId(id);
  };

  const editHandler = async (id) => {
    store.setTypeOfTask("edit");
    store.setFields(customerName, doctorName, complaint);
    setId(id);
    store.setDate(date);
  };

  return (
    <>
      <tr className='appoint__requireditem' key={`visit${_id}`}>
        <td className='appoint__textvalue'>{customerName}</td>
        <td className='appoint__textvalue'>{doctorName}</td>
        <td className='appoint__textvalue'>
          {moment(date).format("DD.MM.YYYY")}
        </td>
        <td className='appoint__textvalue'>{complaint}</td>
        <td className='appoint__textvalue'>
          <i className='edit' onClick={() => editHandler(_id)}>
            <EditIcon />
          </i>
          <i className='delete' onClick={() => deleteHandler(_id)}>
            <DeleteIcon />
          </i>
        </td>
      </tr>
    </>
  );
};

export default TableAppointments;
