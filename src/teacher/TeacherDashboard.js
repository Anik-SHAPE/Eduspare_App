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
import Planner from "../assets/planner.png";
import Menu from "../assets/menu.png";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import Content from "../assets/content.png"
import Batch from "../assets/batch.png";
import Users from "../assets/user.png";
import Institute from "../assets/institute.png";
import Calender from "../assets/calender.png";
import Chat from "../student/Chat";
import AttendanceGraph from "./Graphs/AttendanceGraph";
import ClassGraph from "./Graphs/ClassGraph";
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import CardStyle from "./CalenderDashboard/CalendarCards";
import GlobalChat from './Chat/globalchat';
import { getUser } from '../core/helper/UserApiCall';
import { getInstitute } from '../admin/helper/adminapicall';
import { getTeacher } from './helper/teacherapicall';
import Notification from './Notification/Notification';

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

  const {user, token} = isAuthenticated();

  const [myuser, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    photo: "",
    error: "",
  })

  const [TeacherLoad, setTeacherLoad] = useState({
    instId: "",
    teacherError: ""
  })

  const {instId} = TeacherLoad;

  const {firstname, lastname, email, phone, photo} = myuser;

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
          })
          getTeacher(user._id, token, user.pannelID).then(data => {
            if(data.error){
              setTeacherLoad({...TeacherLoad, teacherError: data.error})
            }else{
              setTeacherLoad({
                ...TeacherLoad,
                instId: data.instituteId,
              })
            }
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

            <Notification/>

            <div className="hideonmobile row ml-1 mr-2">

                <Card onClick={handleClick} className="shadow ml-2" style={{ borderRadius: 100, backgroundColor: "#ff6f00", width: 40, height: 40}} >
                  <img className="d-block w-100 h-100 img-fluid" src={`${API}/get-ins-photo/${instId}`}/>
                </Card>

            </div>

            <Popover className="mt-2" style={{borderRadius: 20}}
              id={id}
              open={opens}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
            <div className="shadow-sm" style={{width: 300}}>
              <center>
                <Card className="shadow mt-3 mb-2" style={{ borderRadius: 100, backgroundColor: "#ff6f00", width: 80, height: 80}} >
                  <img className="d-block w-100 h-100 img-fluid" src={`${API}/get-ins-photo/${instId}`}/>
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
     
        <ul className="navbar-nav">
         
          <li class="nav-item">
            <Link to="/teacher/dashboard" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Dashboard} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Dashboard</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/teacher/planner" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Planner} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Planner</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to={`/teacher/content`} style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Content} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Content</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item active">
            <Link to="/teacher/batch" style={{textDecoration: 'none'}}>
              <ListItem Button >
                <ListItemIcon>
                    <img src={Batch} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Batch</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/teacher/users" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Users} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Users</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/teacher/calender" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Calender} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Calender</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/teacher/more" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={MoreIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>More</p>
              </ListItem>
            </Link>
          </li>

          {/* &nbsp;&nbsp;
          <Divider style={{backgroundColor: "#212121"}}/>
          &nbsp;&nbsp;

          <li class="nav-item">
            <Link to="/" style={{textDecoration: "none"}}>
              <ListItem Button>
                  <ListItemIcon>
                  <img src={Power} width="44px" height="44px"/>
                  </ListItemIcon>
                    <Signout/>
              </ListItem>
            </Link>
        </li> */}
  
        </ul>
        </List>
       
      </Drawer>
      </div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        &nbsp;&nbsp;

        <div className="hideonmobile" >

          <CardStyle/>

          <Grid container spacing="2" className="mb-2 mt-5">
            <Grid item xs={12} sm={6} md={2} >
              <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Planner
                      <p style={{fontSize: 15, fontWeight: "normal"}}>20</p></p>
                    </div>
                    <img className="mt-3" src={Planner} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>
            
              <Link to={`/teacher/content`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Content
                      <p style={{fontSize: 15, fontWeight: "normal"}}>200</p></p>
                    </div>
                    <img className="mt-3" src={Content} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>

              <Link to={`/teacher/batch`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Batch
                      <p style={{fontSize: 15, fontWeight: "normal"}}>4</p></p>
                    </div>
                    <img className="mt-3" src={Batch} width="30px" height="30px"/>
                  </div> 
                </Card>
              </Link>
      
              <Link to={`/teacher/users`} style={{textDecoration: "none"}}>
                <Card className="mb-2" style={{ borderRadius: 10, backgroundColor: "#ffffff", height: 60}} >
                  <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 18, fontWeight: "bold"}}>Users
                      <p style={{fontSize: 15, fontWeight: "normal"}}>700</p></p>
                    </div>
                    <img className="mt-3" src={Users} width="30px" height="30px"/>
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

        <div className="hidedesktop">

          <CardStyle/>

          <Divider/>

          <Grid container spacing="1" className="mb-2 mt-3">
            <Grid item xs={4} sm={6} md={3} >
              <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Planner} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Planner</p>
                  </center>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={4} sm={6} md={3} >
              <Link to={`/teacher/content`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Content} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Content</p>
                  </center>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={4} sm={6} md={3} >
              <Link to={`/teacher/batch`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Batch} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Batch</p>
                  </center>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={4} sm={6} md={3} >
              <Link to={`/teacher/users`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Users} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Users</p>
                  </center>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={4} sm={6} md={3} >
              <Link to={`/teacher/billing`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={BillingIcon} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Billing</p>
                  </center>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={4} sm={6} md={3} >
              <Link to={`/teacher/calender`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Calender} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Calender</p>
                  </center>
                </Card>
              </Link>
            </Grid>
          </Grid>

          <Chat/>
        </div>

        <div className="hideonmobile">
          <GlobalChat/>
        </div>
        
        &nbsp;
        {/* <div className="hideonmobile">
          <Timer/>
        </div> */}
        
      </main>
    </div>
  );
}


