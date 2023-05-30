import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBalanceWalletRoundedIcon from '@material-ui/icons/AccountBalanceWalletRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SubjectIcon from '@material-ui/icons/Subject';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import GradeIcon from '@material-ui/icons/Grade';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Toolbar from '@material-ui/core/Toolbar';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import LogoDB from "../assets/dblogo.png";
import Signout from "../core/Signout";
import { Card, Grid, Chip, Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import {getUser} from "../core/helper/UserApiCall";
import { isAuthenticated } from '../auth';
import { API } from "../backend";
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import "../styles.css";
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import BillingIcon from '../assets/billing.png';
import TeacherIcon from "../assets/teacher.png";
import StudentIcon from "../assets/student.png";
import BellIcon from "../assets/bellicon.png";
import Power from "../assets/power.png";
import MoreIcon from "../assets/more.png";
import Dashboard from "../assets/dashboard.png";
import Institute from "../assets/institute.png";
import Menu from "../assets/menu.png";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import StudentPanel from './StudentPannel';
import InsertCommentIcon from '../assets/chat.png';
import ExamIcon from '../assets/exam.png';
import AttendIcon from "../assets/attend.png";
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import Chat from './Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import BillingLogo from '../assets/billing.png';
import CalendarLogo from '../assets/calender.png';
import HomeworkLogo from '../assets/homework.png';
import AssesMentLogo from '../assets/assesment.png';
import ClassGraph from "./Graphs/ClassGraph";
import AttendanceGraph from './Graphs/AttendanceGraph';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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

  const [opend, setOpens] = React.useState(false);

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
      
      <AppBar
        position="fixed"
        style={{backgroundColor: "#ffffff", borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar  className="mt-2 mb-2" style={{justifyContent: "space-between"}}>
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
      <div className="hideonmobile">
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

          <li class="nav-item row">
            <ListItem Button  
            // onClick={handleClickOpen}
            >
              <ListItemIcon>
                <AccountCircleIcon className="ml-2 mr-3" style={{width: 54, height: 54}}/>
              </ListItemIcon>
              <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Sir, 
              {/* {selectedValue} */}
              </p>
            </ListItem>
          </li>
     
        <ul className="navbar-nav">
         
          

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
    
        

        <StudentPanel/>

        <div className="hideonmobile">

        

          <Grid container spacing="2" className="mb-2 mt-5 pl-1">

            <Grid item xs={12} sm={6} md={2} >

            <Link to={`/teacher/batch`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-1 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Notifications
                      <p style={{fontSize: 15, fontWeight: "normal"}}>4</p></p>
                    </div>
                    <img className="mt-3" src={BellIcon} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>
              
            <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-1 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Attendance
                      <p style={{fontSize: 15, fontWeight: "normal"}}>20%</p></p>
                    </div>
                    <img className="mt-3" src={AttendIcon} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>
           
              <Link to={`/teacher/${classRoom}/content`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-1 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Marks
                      <p style={{fontSize: 15, fontWeight: "normal"}}>70%</p></p>
                    </div>
                    <img className="mt-3" src={ExamIcon} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>

             
      
              <Link to={`/teacher/users`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-1 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Payment
                      <p style={{fontSize: 15, fontWeight: "normal"}}>No Due</p></p>
                    </div>
                    <img className="mt-3" src={BillingLogo} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>

            </Grid>

            <Grid item xs={12} sm={6} md={4} >
              <AttendanceGraph/>
            </Grid>

            <Grid item xs={12} sm={6} md={5} >
              <ClassGraph/>
            </Grid>

          </Grid>
        </div>
        
        
        <Card className="chat shadow hideonmobile" style={{backgroundColor:"#329c08", borderRadius: 90, width: 60, height: 60}}>
            <center><ForumRoundedIcon className="mt-1" style={{width: 42, height: 42, color: "#ffffff"}}/></center>
        </Card>

        <div className="hidedesktop">
            <Chat/>
        </div>

        
      </main>
    </div>
  );
}
