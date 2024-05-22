import "../App.css"; 
import * as React from "react"; 
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { SocialIcon } from 'react-social-icons'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Pic1 from '../assets/Pic1-v2.png';
import Pic2 from '../assets/Pic2-v2.png';
import Pic3 from '../assets/Pic3.png';
import { Margin } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import ApplicationBar from "../Appbar.jsx";



function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", position:"absolute", top: "50%",left:"95%"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", position:"absolute", top: "50%",left:"5%", zIndex: "1001"}}
      onClick={onClick}
    />
  );
}

export default function Home () { 
  
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const navigate = useNavigate();

  function handleClick() {
    navigate("/porto");
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplaySpeed: 4000,
    appendDots: dots => (
      <div
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          padding: "10px",
          position:"absolute",
          top:"95%"
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    console.log(windowDimensions.width)
  };

  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      
      <List>
        {['PROFILE', 'PORTO', 'SCHEDULE', 'FAQ', 'CONTACT'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );



  
  return ( 

    
    <div>
      <ApplicationBar/>
      <div style={{marginTop:60}}>
        <Box sx={{ width: 2530}}>
        
          <Slider {...settings}>
            <img src={Pic1}/>
            <img src={Pic2}/>
            <img src={Pic3}/>
          </Slider>
          <button class='btn' onClick={handleClick}>SEE PORTO</button>
        </Box>

      </div>

    </div>
  ); 
} 
  
