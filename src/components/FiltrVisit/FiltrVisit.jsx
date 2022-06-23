import { React, useContext, useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import { Context } from "src/index";
import "./style.scss";

const FiltrVisit = ({ setList }) => {
  const store = useContext(Context);
  const [sortBy, setSortBy] = useState("");
  const [filterdates, setFilterdates] = useState(true);
  const [maxDate, setMaxDate] = useState("");
  const [minDate, setMinDate] = useState("");

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    if (e.target.value === "customerName") {
      store.setSort("customerName");
    }
    if (e.target.value === "doctorName") {
      store.setSort("doctorName");
    }
    if (e.target.value === "date") {
      store.setSort("date");
    }
    if (e.target.value === "complaint") {
      store.setSort("complaint");
    }
    sortAction();
    setDirect(store.sortDirection);
  };

  const sortAction = () => {
    store.rangeDates
      ? store.secondarySortAppoints()
      : store.primarySortAppoints();
  };

  const setDirect = (str) => {
    sortAction();
    if (str === "desc") {
      store.setDir("desc");
      store.setFilteredSorted(store.filteredSorted.reverse());
    }
    if (str === "asc") {
      store.setDir("asc");
      store.setFilteredSorted(store.filteredSorted);
    }
    setList(store.filteredSorted);
  };

  const handleDirection = (e) => {
    setDirect(e.target.value);
  };

  const handleRangeDates = () => {
    if (!minDate || !maxDate) {
      return store.snackHolder("Установите обе даты для получения диапазона");
    }

    store.setRangeDates(true);
    const start = moment(minDate);
    const end = moment(maxDate);
    const temp = store.allAppointments;
    const tmp = [];
    temp.forEach((element) => {
      const compareDate = moment(element.date);
      if (compareDate.isBetween(start, end)) {
        tmp.push(element);
      }
    });
    store.setFilteredSorted(tmp);
    sortAction();
    setList(store.filteredSorted);
  };

  const handleClearRange = () => {
    store.setRangeDates(false);
    sortAction();
    setDirect(store.sortDirection);
  };

  return (
    <div className='filter'>
      <div className='filter_item filter_sortBy'>
        <span className='filter_text'>Сортировать по</span>
        <select className='filter_select ' onChange={handleSortBy}>
          <option className='filter_options' value=''></option>
          {store.getFields()?.map((element, index) => (
            <option
              className='filter_options'
              key={`option${index}`}
              value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
      {sortBy && (
        <div className='filter_item'>
          <span className='filter_text'>Направление</span>
          <select className='filter_select' onChange={handleDirection}>
            <option value=''></option>
            <option value='asc'>По возрастанию</option>
            <option value='desc'>По убыванию</option>
          </select>
        </div>
      )}
      <div
        className={
          filterdates
            ? "filter_item filter_date"
            : "filter_item filter_itemSetDates"
        }>
        {filterdates ? (
          <>
            <span className='filter_text'>Добавить фильтр по дате:</span>
            <i className='filter_icon'>
              <AddBoxSharpIcon onClick={() => setFilterdates(false)} />
            </i>
          </>
        ) : (
          <>
            <div className='filter_wrap'>
              <span className='filter_text'>c:</span>
              <input
                className='filter_rangeDates'
                max={maxDate}
                onChange={(e) => setMinDate(e.target.value)}
                type='date'
              />
            </div>

            <div className='filter_wrap'>
              <span className='filter_text'>по:</span>
              <input
                className='filter_rangeDates'
                min={minDate}
                onChange={(e) => setMaxDate(e.target.value)}
                type='date'
              />
            </div>

            <div className='filter_wrap'>
              <Button
                variant='outlined'
                onClick={handleRangeDates}
                sx={{
                  backgroundColor: "white",
                  paddingLeft: "50px",
                  paddingRight: "50px",
                }}>
                фильтровать
              </Button>
              <i
                onClick={() => {
                  setFilterdates(true);
                  handleClearRange();
                }}
                className='filter_icon'>
                <DeleteIcon />
              </i>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FiltrVisit;
