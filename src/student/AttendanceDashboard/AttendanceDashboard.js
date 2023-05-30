import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LogoDB from "../../assets/dblogo.png";
import Signout from "../../core/Signout";
import { Card, Grid, Chip, Popover } from '@material-ui/core';
import {Link} from "react-router-dom";
import {getUser} from "../../core/helper/UserApiCall";
import { isAuthenticated } from '../../auth';
import { API } from "../../backend";
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import "../../styles.css";
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BillingLogo from '../../assets/billing.png';
import CalendarLogo from '../../assets/calender.png';
import HomeworkLogo from '../../assets/homework.png';
import AssesMentLogo from '../../assets/assesment.png';
import BellIcon from "../../assets/bellicon.png";
import MoreIcon from "../../assets/more.png";
import Dashboard from "../../assets/dashboard.png";
import ExamIcon from '../../assets/exam.png';
import AttendIcon from "../../assets/attend.png";
import Chat from "../../student/Chat";
import Calender from "../../assets/calender.png";
import GlobalChat from '../Chat/globalchat';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Manageattendance from './ManageAttendance';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: "#ff6f00"
  },
  drawerOpen: {
    width: drawerWidth,
    background: "#ffffff",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    background: "#ffffff",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function OnHover(e) {
    e.target.style.color = '#bdbdbd';
  }

  function OnOut(e) {
    e.target.style.color = '#000000';
  }

  const [myuser, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    photo: "",
    role: "",
    error: "",
    classRoom: ""
  })
  
  const {firstname, lastname, email, phone, photo, role, classRoom} = myuser;
  const {user,token} = isAuthenticated();
  
  const userload = (userId, token) => {
    getUser(userId, token).then(data => {
        if(data.error){
            setUser({...myuser, error: data.error});
        }else{
            setUser({
                ...myuser,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                photo: data.photo,
                role: data.role,
                classRoom: data.classRoom
            })
        }
    });
  }
  
  useEffect(() => {
    userload(user._id, token);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <div className="hideonmobile">

      <AppBar
        position="fixed"
        style={{backgroundColor: "#ffffff", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="mt-2 mb-2" style={{justifyContent: "space-between"}}>
          <div className="hideonmobile row pl-2">
            <IconButton
              style={{outline: "none"}}
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
            <ion-icon name="grid" style={{color: "#000000", fontSize: 35}}></ion-icon>
            </IconButton>
            <img className="my-auto mt-4 mb-4" src={LogoDB} width="180" height="50"/>

          </div>
          <div className="hidedesktop">
            <img className="my-auto mt-4 mb-4" src={LogoDB} width="180" height="50"/>
          </div>
          <div className="row">

            <img className="mr-3" src={BellIcon} width="40px" height="40px"/>

            <div className="hideonmobile row ml-1 mr-2">

              <Card onClick={handleClick} className="shadow ml-2" style={{ borderRadius: 100, backgroundColor: "#ff6f00", width: 40, height: 40}} >
                <img className="d-block w-100 h-100 img-fluid" src={`${API}/user-profile/photo/${user._id}`}/>
              </Card>
            </div>

            <Popover className="mt-2" style={{borderRadius: 20}}
              id={id}
              open={opens}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
            <div className="shadow-sm" style={{width: 300}}>
              <center>
                <Card className="shadow mt-3 mb-2" style={{ borderRadius: 100, backgroundColor: "#ff6f00", width: 80, height: 80}} >
                  <img className="d-block w-100 h-100 img-fluid" src={`${API}/user-profile/photo/${user._id}`}/>
                </Card>
                <p className="font-weight-bold" style={{fontSize: 20, color: "#000000"}} >{firstname} {lastname}
                <Card className="shadow ml-5 mr-5 mt-2 p-1 font-weight-light" style={{ fontSize: 16, borderRadius: 100, backgroundColor: "#0091ea", color:"#ffffff"}}>
                  {email}
                </Card></p>
              </center>
              <center>
              <Link to={"/"} style={{textDecoration: "none"}}>
              <Card className="shadow mt-4 p-2" style={{ borderRadius: 100, backgroundColor: "#00c853", width: 100}}>
                <Signout/>
              </Card>
              </Link>
              </center>
              &nbsp;
            </div>
          </Popover>
          </div>
          
 
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className="row">
            <p className="my-auto mr-4" style={{fontFamily:"comic sans ms", fontWeight:"bold", fontSize: 30}}>Menu</p>
            <IconButton onClick={handleDrawerClose} className="mr-4 mt-2" style={{outline: "none"}}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          
        </div>
        
        <List>
     
        <ul className="navbar-nav">

        <li class="nav-item">
          <Link to="/student/dashboard" style={{textDecoration: 'none'}}>
            <ListItem Button>
              <ListItemIcon>
                  <img src={Dashboard} width="40px" height="40px"/>
              </ListItemIcon>
              <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Dashboard</p>
            </ListItem>
          </Link>
        </li>
         
        <li class="nav-item">
            <Link to="/student/calender" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={CalendarLogo} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Calender</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/student/homework" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={HomeworkLogo} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>HomeWork</p>
              </ListItem>
            </Link>
          </li>

          
          <li class="nav-item" className={classes.hover}>
            <Link to="/student/exam" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={ExamIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Exam</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/student/attendance" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={AttendIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Attendance</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/student/billing" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={BillingLogo} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Billing</p>
              </ListItem>
            </Link>
          </li>
            
          <li class="nav-item">
            <Link to="/student/more" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={MoreIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>More</p>
              </ListItem>
            </Link>
          </li>
        


        </ul>
        </List>
       
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        &nbsp;

        <div className="hidedesktop fixed-top d-block w-100" style={{height: 70, backgroundColor: "#fafafa"}}>

          <Grid container spacing="1" className="mb-1">
            <Grid item xs={2} sm={6} md={6}>
              <Link to={`/student/dashboard`} style={{textDecoration:"none"}}>
                <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
              </Link>
            </Grid>
            <Grid item xs={8} sm={6} md={6}>
              <div className="mt-3 row">
                  <img src={AttendIcon} style={{width: 40, height: 40}}/>
                  <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Attendance</p>  
              </div>
            </Grid>
            <Grid item xs={2} sm={6} md={6}>
              <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
            </Grid>
          </Grid>
        </div>

        <div className="ml-1 mr-2  row hideonmobile" style={{justifyContent: "space-between"}}>
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>Batch Name</p></Card>
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
              <div className="row">
                <Card className="shadow-sm my-auto mr-2" style={{ borderRadius: 100, width: 30, height: 30}} >
                  <img className="d-block w-100 h-100 img-fluid" src={AttendIcon}/>
                </Card>
                <p className="my-auto p-1" style={{fontWeight: "bold", fontSize: 25, color: "#000000"}}>Attendance</p>
              </div>
            </Card>
        </div>
        
        <div className="hidedesktop">
          <center>
            <Card className="pl-4 pr-4" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 18, color: "#ffffff"}}>Batch Name</p></Card>
          </center>
        </div>
        &nbsp;
        <Divider/>
        &nbsp;

        <Manageattendance/>

        <div className="hideonmobile">
          <GlobalChat/>
        </div>

        <div className="hidedesktop"> 
          <Chat/>
        </div>

      </main>
    </div>
  );
}


