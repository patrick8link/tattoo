import "./Porto.css"; 
import * as React from "react"; 
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApplicationBar from "../Appbar.jsx";
import { Calendar, Whisper, Popover, Badge, Button } from 'rsuite';
import ScheduleModal from '../modals/ScheduleModal.jsx';
import Axios from 'axios';
import dayjs from 'dayjs';


// (Optional) Import component styles. If you are using Less, import the `index.less` file. 
import 'rsuite/Calendar/styles/index.css';

function getTodoList(date,dblist) {
  // const day = date.getDate();
  // const month = date.getMonth()+1;
  // const year = date.getYear()+1900;
  const [list, setList] = React.useState([]);
  
  // useEffect(()=> {  
  //   // here we get the data by requesting data from this link
  //   // to our nodejs server
  //   Axios.get('http://127.0.0.1:5000/schedule/get/'+date.format('YYYY-MM-DD'),{params: {}})
  //   .then((res)=> setList(res));
  // }, []);
  
  if (dblist["data"]!="EMPTY" && dblist["data"]!=undefined ){
    // console.log(list["data"])

    for (let i = 0; i < dblist["data"].length; i++) {
      if (dblist["data"][i]["date"] === date.format('YYYY-MM-DD')) {
        return dblist["data"][i]["detail"]
      }
      
    }
    
  }
  

  return [{time:"11:00",title:null},{time:"14:00", title: null}];
}

function renderCell(date,dblist) {
  if (isDayPassed(date)) {
    const list = getTodoList(dayjs( (1900+date.getYear()) + '-' + (1+date.getMonth()) + '-' + date.getDate() ),dblist);
    const displayList = list.filter((item, index) => index < 2);
    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );
  
      return (
        <ul className="calendar-todo-list" >
          {displayList.map((item, index) => (
            <li key={index}>
              {<p color="blue"><s>{item.time}</s></p>}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }
  }
  else {
    const list = getTodoList(dayjs( (1900+date.getYear()) + '-' + (1+date.getMonth()) + '-' + date.getDate() ),dblist);
    const displayList = list.filter((item, index) => index < 2);
    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );
  
      return (
        <ul className="calendar-todo-list" >
          {displayList.map((item, index) => (
            <li key={index}>
              {item.title ? <s color="red"><b>{item.time}</b></s> : <p><b>{item.time}</b></p>}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }
  }
  return null;
}

function availability(date,dblist) {
  if (dblist["data"]!="EMPTY" && dblist["data"]!=undefined ){
    

    for (let i = 0; i < dblist["data"].length; i++) {
      if (dblist["data"][i]["date"] === dayjs( (1900+date.getYear()) + '-' + (1+date.getMonth()) + '-' + date.getDate() ).format('YYYY-MM-DD')) {
        return dblist["data"][i]["availability"]
      }
    }
  }
  return true

}

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
      }
  }
  return arr;
}

function isDayPassed(date) {
  // Checking if the date is pased
  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

const i = 1;
function Schedule() { 
  const [dblist, setdbList] = React.useState([]);
  useEffect(()=> {  
    // here we get the data by requesting data from this link
    // to our nodejs server
    Axios.get('http://127.0.0.1:5000/schedule/get',{params: {}})
    .then((res)=> setdbList(res));
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState({'date':[]});
  return (
    <div>
      <ApplicationBar/>
      {/* cellClassName={date => (availability(date,dblist)>0 ? date.getDay() === 0 | date.getDay() === 6 ? 'redDate':isSelected(date,selectedDate) : 'Full'  ) } */}
      <Calendar bordered renderCell={date => renderCell(date,dblist)} cellClassName={date => (isDayPassed(date) ? 'bg-gray' : availability(date,dblist)>0 ? undefined : 'Full'  ) } />
    </div>
  );


} 
  

export default Schedule;