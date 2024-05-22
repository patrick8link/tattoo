
import Home from "./pages/Home.jsx";
import Porto from "./pages/Porto.jsx";
import Profile from './pages/Profile.jsx';
import Schedule from './pages/Schedule.jsx';
import ScheduleEditable from './pages/ScheduleEditable.jsx';
import Faq from './pages/Faq.jsx';
import Contact from './pages/Contact.jsx';

import './App.css'
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;


function App() {
  const [mode, setMode] = useState(() => {
    // Use local storage to read the current mode, or default to "light"
    return localStorage.getItem('mode') || 'light';
  });
  function toggleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  let component 
  switch (window.location.pathname) {
    case '/home':
      component = <Home />
      break;
    case '/porto':
      component = <Porto />
      break;
  }

  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.body.className = mode;
  }, [mode]);

  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} >
          </Route>
          <Route path='/porto' element={<Porto />} >
          </Route>
          <Route path='/profile' element={<Profile />} >
          </Route>
          <Route path='/schedule' element={<Schedule />} >
          </Route>
          <Route path='/faq' element={<Faq />} >
          </Route>
          <Route path='/contact' element={<Contact />} >
          </Route>
          <Route path='/schedule/personal' element={<ScheduleEditable />} >
          </Route>
      </Routes>
    </Router>
  )
}

export default App;