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
import Grades from "./GradeDashboard/GradeDashboard";
import Subjects from './SubjectDashboard/SubjectDashboard';
import City from "./CityDashboard/CityDashboard";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";

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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
     
        <ul className="navbar-nav">
         
          <li class="nav-item">
            <Link to="/admin/dashboard" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Dashboard} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Dashboard</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/admin/institute" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Institute} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Institute</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/admin/teacher" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={TeacherIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Teacher</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item active">
            <Link to="/admin/student" style={{textDecoration: 'none'}}>
              <ListItem Button >
                <ListItemIcon>
                    <img src={StudentIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Student</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/admin/amount" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={BillingIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Billing</p>
              </ListItem>
            </Link>
          </li>
            
          <li class="nav-item">
            <Link to="/admin/more" style={{textDecoration: 'none'}}>
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
        &nbsp; &nbsp;

        <div className="hideonmobile">

        <Grid container spacing="2" className="mb-2">

          <Grid item xs={12} sm={6} md={3}>
            <Link to={`/admin/institute`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100 m-2" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                  <div>
                    <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 35, fontWeight: "bold"}}>80M
                    <p style={{fontSize: 20, fontWeight: "normal"}}>Institutes</p></p>
                  </div>
                  <img className="my-auto" src={Institute} width="60px" height="60px"/>
                </div> 
              </Card>
            </Link>

            <Link to={`/admin/student`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100 m-2" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                  <div>
                    <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 35, fontWeight: "bold"}}>23L
                    <p style={{fontSize: 20, fontWeight: "normal"}}>Students</p></p>
                  </div>
                  <img className="my-auto" src={StudentIcon} width="60px" height="60px"/>
                </div> 
              </Card>
            </Link>

          </Grid>
            
      
          <Grid item xs={12} sm={6} md={3} >

            <Link to={`/admin/teacher`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100 m-2" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                    <div>
                      <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 35, fontWeight: "bold"}}>10K
                      <p style={{fontSize: 20, fontWeight: "normal"}}>Teachers</p></p>
                    </div>
                    <img className="my-auto" src={TeacherIcon} width="60px" height="60px"/>
                  </div> 
                </Card>
            </Link>

            <Link to={`/admin/amount`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100 m-2" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                  <div>
                    <p className="pt-2 pl-2" style={{fontFamily: "comic sans ms", fontSize: 35, fontWeight: "bold"}}>10M
                    <p style={{fontSize: 20, fontWeight: "normal"}}>Amount</p></p>
                  </div>
                  <img className="my-auto" src={BillingIcon} width="60px" height="60px"/>
                </div> 
              </Card>
            </Link>

          </Grid>

          <Grid item xs={12} sm={6} md={5} >
              <Graph1/>
          </Grid>

          <Grid item xs={12} sm={2} md={1} >
 
            <div className="mb-4 ml-3 mt-2 hideonmobile">
              <Grades/>
              <Subjects/>
              <City/>
            </div> 

            <div className="hidedesktop mb-4">
              <Divider className="mb-3" style={{borderRadius: 20}}/>
              <Card className="d-block w-100 h-100" style={{ borderRadius: 10, backgroundColor: "#bdbdbd"}} >
                <div className="row ml-2 mr-2 mt-1 mb-1" style={{justifyContent: 'space-between'}}>
                  <Grades/>
                  <Subjects/>
                  <City/>
                </div>
              </Card>
            </div>

          </Grid>

          <Grid item xs={12} sm={6} md={4} >
            <Graph2/>
          </Grid>

          <Grid item xs={12} sm={6} md={4} >
            <Graph2/>
          </Grid>

          <Grid item xs={12} sm={6} md={4} >
            <Graph2/>
          </Grid>
          
        </Grid>

        </div>

        <div className="hidedesktop">

          <Grid container spacing="2" className="mb-2">
            <Grid item xs={6} sm={6} md={3}>
              <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Institute} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Institutes</p>
                  </center>
                </Card>
              </Link>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={StudentIcon} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Students</p>
                  </center>
                </Card>
              </Link>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={TeacherIcon} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Teachers</p>
                  </center>
                </Card>
              </Link>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Link to={`/teacher/planner`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={BillingIcon} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Amount</p>
                  </center>
                </Card>
              </Link>
            </Grid>

            <Grid item xs={12} sm={2} md={1} >
 
              <Divider className="mb-3" style={{borderRadius: 20}}/>
              <Card className="d-block w-100 h-100" style={{ borderRadius: 10, backgroundColor: "#bdbdbd"}} >
                <div className="row ml-2 mr-2 mt-3" style={{justifyContent: 'space-between'}}>
                  <Grades/>
                  <Subjects/>
                  <City/>
                </div>
              </Card>

          </Grid>

          </Grid>

        </div>

      </main>
    </div>
  );
}






