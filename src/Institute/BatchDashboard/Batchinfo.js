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
import { Card, Grid, Chip, Popover, Accordion, AccordionSummary,Button,Checkbox,Typography } from '@material-ui/core';
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
import BatchLogo from "../../assets/batch.png";
import Users from "../../assets/student.png";
import PlannerLogo from "../../assets/planner.png";
import Calenders from "../../assets/calender.png";
import HomeWork from "../../assets/homework.png";
import Chat from "../../student/Chat";
import Calender from "../../assets/calender.png";
import Attend from "../../assets/attend.png";
import GlobalChat from '../Chat/globalchat';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Attendance from "./Attendance";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Students from "./Students";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import GradeLogo from '../../assets/grade.png';
import SubjectLogo from "../../assets/subject.png";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Timer from "../../assets/timer.png";
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import {getBatch,removePlannerFromBatch,updateBatch,deleteBatch,getAllBatch,getPlanner,getAllPlanner,createBatch,assignPlannerToBatch} from "../helper/teacherapicall";
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles  } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { getInstitute } from '../../admin/helper/adminapicall';

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" style={{outline: "none"}} className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function MiniDrawer(props) {
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
    pannelId: "",
    error: "",
  })
  
  const {firstname, lastname, email, phone, photo, role, pannelId} = myuser;
  const {user,token} = isAuthenticated();

  const [InstituteLoad, setInstituteLoad] = useState({
    instituteName: "",
    instituteEmail: "",
    institutePhone: "",
    instituteAdmin: "",
    insterror: "",
    instloading: false,
    instsuccess: false,
    instformData: new FormData()
  })
  
  const {instituteName, instituteEmail, institutePhone, Iphoto, instituteAdmin, instformData, insterror, instloading, instsuccess} = InstituteLoad;

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
              pannelId: data.pannelID
          })
          getInstitute(user._id, token, data.pannelID).then(data => {
            if(data.error){
              setInstituteLoad({...InstituteLoad, insterror: data.error})
            }else{
              setInstituteLoad({
                ...InstituteLoad,
                instituteName: data.instituteName,
                instituteEmail: data.instituteEmail,
                institutePhone: data.institutePhone,
                instituteAdmin: data.instituteAdmin
              })
            }
          })
        }
    });
  }
  

  const [Batch,setBatch]=useState({
    batchname:"",
    start_time:"",
    end_time:"",
    planner_sdate:"2020-05-24",
    planner:"",
    weekdays:[]
  });
  const {batchname,start_time,end_time,planner_sdate,planner,weekdays}=Batch;

  const [Planner,setPlanner]=useState({
    planner_name:"",
    duration:""
  });

  const {planner_name,duration}=Planner;

  const [Planners,setPlanners]=useState([]);
  const [plannerId,setPlannerId]=useState("");
  const [dialogOpen,setdialogOpen]=React.useState(false);
  
  const handledialogOpen=()=>{
    setdialogOpen(true);
  };

  const handledialogClose=()=>{
    setdialogOpen(false);
  };


  const getAllPlannerByClass=()=>{

    getAllPlanner(user._id,token,user.pannelID).then(data=>{
         if(data.error){
           console.log('error in db')
         }else{
              setPlanners(data);

         }
    })
  };

  const getThisPlanner=()=>{
  if(planner!=null){
      getPlanner(user._id,token,user.pannelID,planner).then(data=>{
        if(data.error){
          console.log('error in db');
        }else{
          setPlanner({
            ...Planner,
            planner_name:data.planner_name,
            duration:data.duration
          });
          setPlannerId(data._id);

        }
      })
    }
  };

  const handleListToggle=event=> {
     
  setPlannerId(event.target.value);
  
  };


 const assignPlanner=event=>{
   event.preventDefault();
   assignPlannerToBatch(user._id,token,props.match.params.batchId,plannerId,{planner_sdate}).then(data=>{
        if(data.error){
          console.log("error in db")
        }else{
          console.log("successfull");
          setBatch({...Batch,planner:data.planner,planner_sdate:data.planner_sdate});
          getPlanner(user._id,token,user.pannelID,data.planner).then(data=>{
            if(data.error){
              console.log('error in db');
            }else{
              setPlanner({
                ...Planner,
                planner_name:data.planner_name,
                duration:data.duration
              });
              setPlannerId(data._id);
    
            }
          });
        
          setdialogOpen(false);
          
        }
   })
 }


 const removePlanner=event=>{
   event.preventDefault();
  removePlannerFromBatch(user._id,token,props.match.params.batchId).then(data=>{
          if(data.error){
            console.log('error in db')
          }else{
            console.log("succesfull")
            setBatch({
              ...Batch,
              planner:data.planner,
              planner_sdate:"2020-05-15"
            });
            setPlannerId("");

            
          }
  });
 }
  const getThisBatch=()=>{
    getBatch(user._id, token, user.pannelID, props.match.params.batchId).then(data=>{
      if(data.error){
        console.log('error in db');
      }else{
        setBatch({
          ...Batch,
          batchname:data.batchname,
          start_time:data.start_time,
          end_time:data.end_time,
          planner_sdate:data.planner_sdate,
          planner:data.planner
        });

        if(data.planner!=""){
        getPlanner(user._id,token,user.pannelID,data.planner).then(data=>{
          if(data.error){
            console.log('error in db');
          }else{
            setPlanner({
              ...Planner,
              planner_name:data.planner_name,
              duration:data.duration
            });
            setPlannerId(data._id);
  
          }
        });
        
      }
      
      }
    }).catch(()=>console.log('error'))
   };

  const handleChange=name=>event=>{
     setBatch({...Batch,[name]:event.target.value});
  }
  
  useEffect(() => {
    userload(user._id, token);
    getThisBatch();
    getAllPlannerByClass();
   
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
                <img className="d-block w-100 h-100 img-fluid" src={`${API}/get-ins-photo/${pannelId}`}/>
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
                  <img className="d-block w-100 h-100 img-fluid" src={`${API}/get-ins-photo/${pannelId}`}/>
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
            <Link to="/institute/admin/dashboard" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Dashboard} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Dashboard</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/institute/admin/planner" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={PlannerLogo} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Planner</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to={`/institute/admin/content`} style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Content} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Content</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item active">
            <Link to="/institute/admin/batch" style={{textDecoration: 'none'}}>
              <ListItem Button >
                <ListItemIcon>
                    <img src={BatchLogo} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Batch</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/institute/admin/users" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Users} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Users</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/institute/admin/calender" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Calender} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Calender</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/institute/admin/billing" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={BillingIcon} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Payment</p>
              </ListItem>
            </Link>
          </li>
            
          <li class="nav-item">
            <Link to="/institute/admin/more" style={{textDecoration: 'none'}}>
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

        <div className="hidedesktop fixed-top d-block w-100" style={{height: 70, backgroundColor: "#fafafa"}}>
          <Grid container spacing="1" className="mb-1">
            <Grid item xs={2} sm={6} md={6}>
              <Link to={`/teacher/batch`} style={{textDecoration:"none"}}>
              <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
            </Link>
            </Grid>
            <Grid item xs={8} sm={6} md={6}>
              <div className="mt-3 row">
                  <img src={BatchLogo} style={{width: 40, height: 40}}/>
                  <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Batch Info</p>  
              </div>
            </Grid>
            <Grid item xs={2} sm={6} md={6}>
              <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
            </Grid>
          </Grid>
        </div>

        &nbsp;

        <div className="ml-2 mr-2  row hideonmobile" style={{justifyContent: "space-between"}}>
          <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#0091ea"}}>
      <p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>{batchname}</p>
          </Card>
          <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
            <div className="row">
              <Card className="shadow-sm my-auto mr-2" style={{ borderRadius: 100, width: 30, height: 30}} >
                <img className="d-block w-100 h-100 img-fluid" src={BatchLogo}/>
              </Card>
              <p className="my-auto p-1" style={{fontWeight: "bold", fontSize: 25, color: "#000000"}}>Batch Info</p>
            </div>
          </Card>
        </div>

        <div className="hidedesktop">
          <center>
      <Card className="pl-4 pr-4" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 18, color: "#ffffff"}}>{batchname}</p></Card>
          </center>
        </div>

        &nbsp;
        <Divider/>
        &nbsp;

        <div className="hidedesktop">
          <Grid container spacing="1" className="mb-1">
            <Grid item xs={12} sm={12} md={12}>
              <Accordion className="pt-2" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className="row ml-1">
                        <img  src={PlannerLogo} width="35px" height="35px"/>
                        <p className="mt-1 pl-2" style={{fontSize: 20, color: "#000000"}}>Planner</p>
                    </div>
                  </AccordionSummary>
                    <div className="row pl-4 pr-4" style={{justifyContent: "flex-end"}}>
                      <p>Add Planner
                      <Button onClck={handledialogOpen}>
                      <AddCircleRoundedIcon className="ml-2" style={{color: "#424242", fontSize: 35}}/>
                      </Button>
                      </p>

                  
                    </div>
                    {
                       planner!=""?(
                    <Card className="d-block w-100 pl-2 pr-2 pb-3 pt-2" style={{ borderRadius: 6, backgroundColor: "#ffffff", overflowY: 'auto',  maxHeight: 440}}>
                   
                    <Card className="d-block w-100 mt-3 p-2 shadow" style={{ borderRadius: 6, backgroundColor: "#ffffff"}}>
                      <div className="row ml-1" style={{justifyContent: "space-between"}}>
                      <Link to={`/teacher/planner/${planner}`} style={{textDecoration: "none"}}> <p className="my-auto" style={{color: "#00c853", fontSize: 16}}>{planner_name}<p style={{color: "#000000", fontSize: 12}}>{planner_sdate}</p></p></Link>
                        <Button onClick={removePlanner}>
                        <CancelRoundedIcon style={{color: "#ff1744"}} className="mr-3"/>
                        </Button>
                      </div>
                    </Card>
                  
                </Card>
                      ):null
              }
              </Accordion>
            </Grid>

            <Grid item xs={6} sm={12} md={12}>
              <Link to={`/teacher/batch/students`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100 mt-2" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={StudentIcon} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Student</p>
                  </center>
                </Card>
              </Link>
            </Grid>

            <Grid item xs={6} sm={12} md={12}>
              <Link to={`/teacher/batch/students`} style={{textDecoration: "none"}}>
                <Card className="d-block w-100 mt-2" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                  <center>
                    <img className="mt-3" src={Timer} width="50px" height="50px"/>
                    <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Time Schedule</p>
                  </center>
                </Card>
              </Link>
            </Grid>

          </Grid>

        </div>
        
        <div className="hideonmobile">
          <Grid container spacing="1" className="mb-1">
            <Grid item md={9}>
            <Card className="d-block w-100 mt-2 pl-3 pr-3 pb-3" style={{ borderRadius: 6, backgroundColor: "#ffffff", overflowY: 'auto',  maxHeight: 420}}>
              <div className="row pl-3 pr-3" style={{justifyContent: "space-between"}}>
                <div className="row">
                <img className="my-auto ml-3" src={StudentIcon} width="35px" height="35px"/>
                <p className="pt-3 pl-2" style={{fontSize: 20, color: "#000000"}}>Student</p>
                </div>
                <div>
                <FilterListRoundedIcon className="mt-2 pt-1 mr-2" style={{color: "#000000", fontSize: 40}}/>
                  <AddCircleRoundedIcon className="mt-2 pt-1" style={{color: "#00c853", fontSize: 40}}/>
                </div>
                
              </div>
              <Divider/>

              <Card className="d-block w-100 mt-3 pl-2 pt-2 pr-2 shadow" style={{ borderRadius: 6, backgroundColor: "#ffffff"}}>
                <div className="row ml-1" style={{justifyContent: "space-between"}}>
                  <p className="my-auto" style={{color: "#00c853", fontSize: 16}}>Student Name</p>
                 
                  <CancelRoundedIcon style={{color: "#ff1744"}} className="mr-3"/>
                </div>
                <p className="ml-1">Grade: II</p>
              </Card>

              <Card className="d-block w-100 mt-1 pl-2 pt-2 pr-2 shadow" style={{ borderRadius: 6, backgroundColor: "#ffffff"}}>
                <div className="row ml-1" style={{justifyContent: "space-between"}}>
                  <p className="my-auto" style={{color: "#00c853", fontSize: 16}}>Student Name</p>
                  <CancelRoundedIcon style={{color: "#ff1744"}} className="mr-3"/>
                </div>
                <p className="ml-1">Grade: II</p>
              </Card>
              
            </Card>
            </Grid>
            <Grid item md={3}>
              <div>
              <Accordion className="pt-2 mt-2" style={{borderRadius: 10, backgroundColor: "#ffffff"}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className="row ml-1">
                        <img  src={PlannerLogo} width="35px" height="35px"/>
                        <p className="mt-1 pl-2" style={{fontSize: 20, color: "#000000"}}>Planner</p>
                    </div>
                  </AccordionSummary>
                    <div className="row pl-4 pr-4" style={{justifyContent: "flex-end"}}>
                      <p>Add Planner
                      <Button onClick={handledialogOpen}>
                      <AddCircleRoundedIcon className="ml-2" style={{color: "#424242", fontSize: 35}}/>
                      </Button>
                      </p>
                    </div>
                     {
                       planner!=""?(
                        <Card className="d-block w-100 pl-2 pr-2 pb-3 pt-2" style={{ borderRadius: 6, backgroundColor: "#ffffff", overflowY: 'auto',  maxHeight: 440}}>
                        
                        <Card className="d-block w-100 mt-3 p-2 shadow" style={{ borderRadius: 6, backgroundColor: "#ffffff"}}>
                          <div className="row ml-1" style={{justifyContent: "space-between"}}>
                          <Link to={`/teacher/planner/${planner}`} style={{textDecoration: "none"}}> <p className="my-auto" style={{color: "#00c853", fontSize: 16}}>{planner_name}<p style={{color: "#000000", fontSize: 12}}>{planner_sdate}</p></p></Link>
                            <Button onClick={removePlanner}>
                            <CancelRoundedIcon style={{color: "#ff1744"}} className="mr-3"/>
                            </Button>
                          </div>
                        </Card>
                      
                    </Card>
                       ):null
                     }
              </Accordion>
              </div>
              <div>
              <Accordion className="pt-2 mt-2" style={{borderRadius: 10, backgroundColor: "#ffffff"}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <div className="row ml-1">
                        <img  src={Timer} width="35px" height="35px"/>
                        <p className="mt-1 pl-2" style={{fontSize: 20, color: "#000000"}}>Time Scheduler</p>
                    </div>
                  </AccordionSummary>
                    <div className="row pl-4 pr-4" style={{justifyContent: "flex-end"}}>
                      <p>Edit Time Schedule
                      <CreateRoundedIcon className="ml-2" style={{color: "#424242", fontSize: 30}}/></p>
                    </div>
                    <Divider/>
                    <p>Hi</p>
                    
              </Accordion>
              </div>
            </Grid>
          </Grid>
        </div>

 
        <Dialog onClose={handledialogClose} fullWidth="true"  aria-labelledby="customized-dialog-title" open={dialogOpen}>
          <DialogTitle id="customized-dialog-title" onClose={handledialogClose}>
          <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>Assign Planner</p>
          </DialogTitle>
          <Divider/>
           &nbsp;

           <center>
          <TextField
          id="date"
          label="Start Date"
          type="date"
          onChange={handleChange("planner_sdate")}
          value={planner_sdate}
          className={classes.textField}
          InputLabelProps={{
          shrink: true,
         }}
         />
         </center>

          <DialogContent>
         
          
          {/* <List dense className={classes.ListViewroot}> */}
          <FormControl component="fieldset">
     
          <RadioGroup aria-label="gender" name="gender1" value={plannerId} onChange={handleListToggle}>

              {Planners.map((planner)=>{
                return(
                  <FormControlLabel value={planner._id} control={<Radio

                     />} label={planner.planner_name} />
                )
              })}
            </RadioGroup>
          </FormControl>
            {/* </List> */}

                  </DialogContent>
                  <DialogActions>
                  <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 5, backgroundColor: "#00c853", color: "#ffffff",width:120}} onClick={assignPlanner}>Add</button>
              </DialogActions>
            </Dialog>
                  
                  
        

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


