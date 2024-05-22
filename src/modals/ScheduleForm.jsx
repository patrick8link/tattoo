import React from 'react';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';
import Axios from 'axios';

import "./modal.css";

function checkDate(selectedDate) {
    console.log(selectedDate['selectedDate'])
    return selectedDate['selectedDate'].join(', ')
}


function Usergroupsform(selectedDate) {
    


    // const date = dayjs( (1900+selectedDate['selectedDate'].getYear()) + '-' + (1+selectedDate['selectedDate'].getMonth()) + '-' + selectedDate['selectedDate'].getDate() );
    // variables for the registration validation 
    
    const [form, setForm] = useState({'time':null,'title':null,'availability':true});
    const [errors, setErrors] = useState({});

    const handleChange =(e) => {
        form['availability']=e.target.value
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            let checkForm = true;

            if (checkForm){
                for (let i = 0; i < selectedDate['selectedDate'].length; i++) {
                    var request = []
                    var date = dayjs(selectedDate['selectedDate'][i])
                    console.log(form)
                    if (form['time'] != null) {
                        request = {"date": date.format('YYYY-MM-DD'), "availability":form['availability'],"detail": [{"time":form["time"].format('HH:mm'),"title":form["title"]}]}
                    }
                    else {
                        request = {"date": date.format('YYYY-MM-DD'), "availability":form['availability'],"detail": [{"time":null,"title":form["title"]}]}
                        
                    }
                        
                    console.log(request);   
                    const response1 = await Axios.put('http://127.0.0.1:5000/schedule/put', request)
                    console.log(response1)   
                }

    
            }
        }
        catch (error) {
            console.log(error)
        }

    
    }

    const [value, setValue] = React.useState(dayjs('2022-04-17T11:00'));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



  return (
    <div style={{margin:"20px"}}>
        {/* form to submit the user-group part */}
        <form onSubmit={handleSubmit}> 
            <div className='dateInput'>
                <label htmlFor="name">Date: {checkDate(selectedDate)}</label>
            </div>
            <div className='availabilityInput' id="availabilityBox">
                <label>Availability: </label>
                <select id="availability" name="availability" onChange={handleChange}>
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                </select>
            </div>
            <br></br>
            <div className='timeInput' id="timeBox">
                {/* Name label and Input */}
                <label htmlFor="name">Time: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker
                        defaultValue={dayjs('2022-04-17T11:00')}
                        label="With Time Clock"
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}
                        onChange={(newValue) => form['time'] = newValue}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <br></br>

            <div className='detailInput' id="detailBox">
                <label>Details: </label>
                <input name="Detail"
                    placeholder='Enter Title / Detail'
                    value= {form.detailInput}
                    onChange={(e) => form['title'] = e.target.value} />   
            </div>
            <footer className='footer'>
                <button type='submit'>Submit</button>
            </footer>
        </form>
    </div>
  )
}

export default Usergroupsform;