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


function Profile() { 
  
  return ( 

    
    <div>
      <ApplicationBar/>
      THIS IS PROFILE
    </div>
  ); 
} 
  
export default Profile;