import * as React from "react"; 
import Usergroupsform from './ScheduleForm.jsx';
import "./modal.css";
import { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import styled from "styled-components";
import dayjs from 'dayjs';
import Axios from 'axios';
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

function isDayPassed(date) {
  // Checking if the date is pased
  return new Date(new Date(date).toDateString()) < new Date(new Date().toDateString());
}

function checkDate(selectedDate) {
  console.log(selectedDate['date'])
  return selectedDate['date'].join(', ')
}

function ScheduleModal({closeModal,selectedDate}) {
  const [dblist, setdbList] = React.useState([]);
  console.log("selectedDate" ,selectedDate['date'])

  if (isDayPassed(selectedDate['date'][0])) {
    console.log("HERE")
    console.log("dbList",dblist)
    console.log("selectedDate length",selectedDate['date'].length)
    for (let i = 0 ; i < selectedDate['date'].length; i++) {
    // var date = dayjs( (1900+selectedDate['date'].getYear()) + '-' + (1+selectedDate['date'].getMonth()) + '-' + selectedDate['date'].getDate() );
      var date = dayjs(selectedDate['date'])
      console.log(selectedDate['date'])
      console.log('date',date)
      var ul = document.getElementById("ct");
      useEffect(()=> {  
        // here we get the data by requesting data from this link
        // to our nodejs server
        Axios.get('http://127.0.0.1:5000/schedule/get/'+date.format("YYYY-MM-DD"),{params: {}})
        .then((res)=> setdbList(res));
      }, []);
      console.log("dbList",dblist)
      if (dblist["data"] != undefined && dblist["data"] != 'EMPTY') {
        for (let i=0 ; i < dblist["data"]["detail"].length; i++){
          var obj = dblist["data"]["detail"][i];
          console.log(obj)
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(obj.time));
          li.appendChild(document.createTextNode(' - '));
          li.appendChild(document.createTextNode(obj.title));
          ul.appendChild(li);  
        }
      }
    }
    return (
      
      <div className='modalBackground'>
        <div className='light-modalContainer'>
            {/* <button className='closeModalBtn' onClick={() => {closeModal(false);} }> X </button> */}
            <CloseButton style={{backgroundColor: "#F9F9F9", color:"#000", width:"10px"}}  onClick={() => {closeModal(false);} }>X</CloseButton>
            <label htmlFor="name">Date: {checkDate(selectedDate)}</label>
            <ul id="ct"></ul>
        </div>
      </div>
    )
  } else {
    for (let i = 0 ; i < selectedDate['date'].length; i++) {
    // var date = dayjs( (1900+selectedDate['date'].getYear()) + '-' + (1+selectedDate['date'].getMonth()) + '-' + selectedDate['date'].getDate() );
      var date = dayjs(selectedDate['date'])
      //var ul = document.getElementById("ct");
      var tr = document.getElementById("tr");
      useEffect(()=> {  
        // here we get the data by requesting data from this link
        // to our nodejs server
        Axios.get('http://127.0.0.1:5000/schedule/get/'+date.format("YYYY-MM-DD"),{params: {}})
        .then((res)=> setdbList(res));
      }, []);
      if (dblist["data"] != undefined && dblist["data"] != 'EMPTY') {
        for (let i=0 ; i < dblist["data"]["detail"].length; i++){
          var obj = dblist["data"]["detail"][i];
          console.log(obj)
          var th = document.createElement("th");
          tr.appendChild(th);
          var title = document.createElement('Title');
          title.appendChild(document.createTextNode('schedule'))
          th.appendChild(title)
          var ul = document.createElement("th");
          
          th.appendChild(ul);
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(obj.time));
          li.appendChild(document.createTextNode(' - '));
          li.appendChild(document.createTextNode(obj.title));
          ul.appendChild(li);  
        }
      }
    }
  
  
    return (
      
      <div className='modalBackground'>
        <div className='light-modalContainer'>
          {/* <button className='closeModalBtn' onClick={() => {closeModal(false);} }> X </button> */}
          <CloseButton style={{backgroundColor: "#F9F9F9", color:"#000", width:"10px"}}  onClick={() => {closeModal(false);} }>X</CloseButton>
          <table>
            <tbody>
              <tr id='tr'>
                <th>

                  <Title>Schedule</Title>
                  <div className='body'>
                      <Usergroupsform selectedDate={selectedDate['date']}/>
                  </div>
                </th>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default ScheduleModal