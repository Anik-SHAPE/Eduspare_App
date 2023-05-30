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
import { Card, Grid, Chip, Popover, TextField } from '@material-ui/core';
import {Link} from "react-router-dom";
import {getUser} from "../../core/helper/UserApiCall";
import { isAuthenticated } from '../../auth';
import { API } from "../../backend";
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import "../../styles.css";
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BillingIcon from '../../assets/billing.png';
import TeacherIcon from "../../assets/teacher.png";
import StudentIcon from "../../assets/student.png";
import BellIcon from "../../assets/bellicon.png";
import MoreIcon from "../../assets/more.png";
import Dashboard from "../../assets/dashboard.png";
import Content from "../../assets/content.png";
import Batch from "../../assets/batch.png";
import Users from "../../assets/student.png";
import Planner from "../../assets/planner.png";
import Calenders from "../../assets/calender.png";
import Chat from "../../student/Chat";
import Calender from "../../assets/calender.png";
import Attend from "../../assets/attend.png";
import GlobalChat from '../Chat/globalchat';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import PaymentIcon from '@material-ui/icons/Payment';
import BioLogo from "../../assets/bio.jpg";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 135,
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

      <main className={classes.content} >
        <div className={classes.toolbar} className="hidedesktop"/>
          <div className="hidedesktop mb-5">
            <div className="fixed-top d-block w-100" style={{height: 70, backgroundColor: "#fafafa"}}>
              <Grid container spacing="1" className="mb-1">
                  <Grid item xs={2} sm={6} md={6}>
                  <Link to={`/teacher/batches`} style={{textDecoration:"none"}}>
                  <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
                  </Link>
                  </Grid>
                  <Grid item xs={8} sm={6} md={6}>
                  <div className="mt-3 row">
                      <img src={Batch} style={{width: 40, height: 40}}/>
                      <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Batch Name</p>  
                  </div>
                  </Grid>
                  <Grid item xs={2} sm={6} md={6}>
                  <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
                  </Grid>
              </Grid>
            </div>
          </div>

          &nbsp;

        <Card className="shadow d-block w-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
        
          <div className="row ml-1 mr-1" style={{justifyContent: "space-between"}}>
            <div className="row ml-3 hidedesktop">
                <img className="mt-3" src={Attend} width="35px" height="35px"/>
                <p className="pt-4 pl-2" style={{fontSize: 16, color: "#000000"}}>Attendance</p>
            </div>
        
              
            <div className="alignright">
                <form className={classes.container} className="mt-3 ml-2 mr-2" noValidate>
                <TextField
                    id="date"
                    type="date"
                    defaultValue="2020-11-05"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </form>
            </div>
          </div>

        <div className="form-group pl-3 pr-3 pt-2">
            <select className="form-control" placeholder="Category">
                <option>Select Grade</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
            </select>
        </div>

        <Divider/>
         
        <div className="pt-3 pl-2 pr-3">
            <Card className="shadow-sm d-block w-100 h-100 m-1" style={{ backgroundColor: "#eceff1"}}>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <div className="row ml-4 pt-2 pb-2">
                        <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                            <img className="d-block w-100 h-100 img-fluid" src={BioLogo}/>
                        </Card>
                        <p className="pl-2 my-auto" style={{fontSize: 18}}>{firstname} {lastname}</p>
                    </div>
                    <FormGroup row className="pt-2 pr-2">
                    <FormControlLabel style={{color: "#ff1744"}}
                        control={<Checkbox  style={{color: "#ff1744"}} name="checkedA" />}
                        label="A"
                    />
                    <FormControlLabel style={{color: "#00c853"}}
                        control={
                        <Checkbox
                            name="checkedB"
                            style={{color: "#00c853"}}
                        />
                        }
                        label="P"
                    />
                    </FormGroup>
                </div>
            </Card>

            <Card className="shadow-sm d-block w-100 h-100 m-1" style={{ backgroundColor: "#eceff1"}}>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <div className="row ml-4 pt-2 pb-2">
                        <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                            <img className="d-block w-100 h-100 img-fluid" src={BioLogo}/>
                        </Card>
                        <p className="pl-2 my-auto" style={{fontSize: 18}}>Goutam Sarkar</p>
                    </div>
                    <FormGroup row className="pt-2 pr-2">
                    <FormControlLabel style={{color: "#ff1744"}}
                        control={<Checkbox  style={{color: "#ff1744"}} name="checkedA" />}
                        label="A"
                    />
                    <FormControlLabel style={{color: "#00c853"}}
                        control={
                        <Checkbox
                            name="checkedB"
                            style={{color: "#00c853"}}
                        />
                        }
                        label="P"
                    />
                    </FormGroup>
                </div>
            </Card>

            <Card className="shadow-sm d-block w-100 h-100 m-1" style={{ backgroundColor: "#eceff1"}}>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <div className="row ml-4 pt-2 pb-2">
                        <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                            <img className="d-block w-100 h-100 img-fluid" src={BioLogo}/>
                        </Card>
                        <p className="pl-2 my-auto" style={{fontSize: 18}}>Joydeep Das</p>
                    </div>
                    <FormGroup row className="pt-2 pr-2">
                    <FormControlLabel style={{color: "#ff1744"}}
                        control={<Checkbox  style={{color: "#ff1744"}} name="checkedA" />}
                        label="A"
                    />
                    <FormControlLabel style={{color: "#00c853"}}
                        control={
                        <Checkbox
                            name="checkedB"
                            style={{color: "#00c853"}}
                        />
                        }
                        label="P"
                    />
                    </FormGroup>
                </div>
            </Card>

            <Card className="shadow-sm d-block w-100 h-100 m-1" style={{ backgroundColor: "#eceff1"}}>
                <div className="row" style={{justifyContent: "space-between"}}>
                    <div className="row ml-4 pt-2 pb-2">
                        <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                            <img className="d-block w-100 h-100 img-fluid" src={BioLogo}/>
                        </Card>
                        <p className="pl-2 my-auto" style={{fontSize: 18}}>Anik Roy</p>
                    </div>
                    <FormGroup row className="pt-2 pr-2">
                    <FormControlLabel style={{color: "#ff1744"}}
                        control={<Checkbox  style={{color: "#ff1744"}} name="checkedA" />}
                        label="A"
                    />
                    <FormControlLabel style={{color: "#00c853"}}
                        control={
                        <Checkbox
                            name="checkedB"
                            style={{color: "#00c853"}}
                        />
                        }
                        label="P"
                    />
                    </FormGroup>
                </div>
            </Card>


            <Card className="shadow-sm d-block w-100 h-100 mt-3 mr-1 ml-1 " style={{ backgroundColor: "#00c853", borderRadius: 15}}>
                <center><p className="my-auto p-1" style={{fontSize: 20, color: "#ffffff"}}>Submit</p></center>
            </Card>
            
        </div>
        
        &nbsp;
        </Card>

        <div className="hidedesktop">
            <Chat/>
        </div>

      </main>
    </div>
  );
}



