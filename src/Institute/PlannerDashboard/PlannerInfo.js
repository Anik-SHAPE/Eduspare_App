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
import { makeStyles, useTheme, withStyles  } from '@material-ui/core/styles';
import LogoDB from "../../assets/dblogo.png";
import Signout from "../../core/Signout";
import { Card, Grid, Chip, Popover, Button, Checkbox } from '@material-ui/core';
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
import BillingIcon from '../../assets/billing.png';
import TeacherIcon from "../../assets/teacher.png";
import StudentIcon from "../../assets/student.png";
import BellIcon from "../../assets/bellicon.png";
import MoreIcon from "../../assets/more.png";
import Dashboard from "../../assets/dashboard.png";
import Institute from "../../assets/institute.png";
import Content from "../../assets/content.png"
import Batch from "../../assets/batch.png";
import Users from "../../assets/user.png";
import PlannerIcon from "../../assets/planner.png";
import Calenders from "../../assets/calender.png";
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import AddContent from "./AddContent";
import Chat from "../../student/Chat";
import Calender from "../../assets/calender.png";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import GlobalChat from '../Chat/globalchat';
import { CheckBox } from 'devextreme-react';
import {getPlanner,updatePlanner,getAllContentByClassRoom,getAllContentByPlanner,assignContentToPlanner,removeContentFromPlanner } from '../helper/teacherapicall';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { getInstitute } from '../../admin/helper/adminapicall';
import Slide from '@material-ui/core/Slide';

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
  popBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const [Planner,setPlanner]=React.useState({
    planner_name:"",
    duration:1
  });

  const {planner_name,duration}=Planner;

  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [dialogOpen,setdialogOpen]=React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handledialogOpen=()=>{
    setdialogOpen(true);
  };

  const handledialogClose=()=>{
    setdialogOpen(false);
  };

  function OnHover(e) {
    e.target.style.color = '#bdbdbd';
  }

  function OnOut(e) {
    e.target.style.color = '#000000';
  }

  const [checked, setChecked] = React.useState([]);
  const [contents,setcontents]=useState([]);
  const [plannerContent,setplannerContent]=useState([]);


  const handleListToggle = content =>()=> {
    const currentIndex = checked.indexOf(content._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(content._id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  
  };
  
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

  const assignContent=()=>{
    assignContentToPlanner(user._id,token,props.match.params.plannerId,{checked}).then(data=>{
      if(data.error){
        console.log("error in db")
      }else{
       setChecked(data.lectures);
       getPlannerContents()
       setdialogOpen(false);
      }
    })
   };
 
   const removeContent=contentId=>event=>{
     event.preventDefault()
     removeContentFromPlanner(user._id,token,props.match.params.plannerId,contentId).then(data=>{
       if(data.error){
         console.log('error in db')
       }else{
         setChecked(data.lectures);
         getPlannerContents();
       }
     })
   };
 
 
 
   const getPlannerContents=()=>{
     getAllContentByPlanner(user._id,token,props.match.params.plannerId).then(data=>{
       if(data.error){
         console.log('error in db');
       }else{
         setplannerContent(data);
       }
     })
   }
 
   const getThisPlanner=plannerId=>{
     getPlanner(user._id,token,user.pannelID,plannerId).then(data=>{
       if(data.error){
         console.log('error to fetch data');
       }else{
         setPlanner({
           ...Planner,
           planner_name:data.planner_name,
           duration:data.duration
         });
         setChecked(data.lectures);
       }
     }).catch(()=>console.log('error'))
   };
 
   const getAllContent=()=>{
     getAllContentByClassRoom(user._id,token,user.pannelID).then(data=>{
       if(data.error){
         console.log("error in db")
       }else{
         setcontents(data);
       }
     })
   }
 
 
   
   useEffect(() => {
     userload(user._id, token);
     getThisPlanner(props.match.params.plannerId);
     getAllContent();
     getPlannerContents();
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
                    <img src={PlannerIcon} width="40px" height="40px"/>
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
                    <img src={Batch} width="40px" height="40px"/>
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
              <Link to={`/teacher/dashboard`} style={{textDecoration:"none"}}>
              <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
            </Link>
            </Grid>
            <Grid item xs={8} sm={6} md={6}>
              <div className="mt-3 row">
                  <img src={PlannerIcon} style={{width: 40, height: 40}}/>
                  <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Planner Info</p>  
              </div>
            </Grid>
            <Grid item xs={2} sm={6} md={6}>
              <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
            </Grid>
          </Grid>
        </div>
        &nbsp;
        <div className="ml-1 mr-2  row hideonmobile" style={{justifyContent: "space-between"}}>
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>Planner Name</p></Card>
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
              <div className="row">
                <Card className="shadow-sm my-auto mr-2" style={{ borderRadius: 100, width: 30, height: 30}} >
                  <img className="d-block w-100 h-100 img-fluid" src={PlannerIcon}/>
                </Card>
                <p className="my-auto p-1" style={{fontWeight: "bold", fontSize: 25, color: "#000000"}}>Planner Info</p>
              </div>
            </Card>
        </div>
        <div className="hidedesktop">
          <center>
            <Card className="pl-4 pr-4" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 18, color: "#ffffff"}}>Planner Name</p></Card>
          </center>
        </div>
        &nbsp;
        <Divider/>
        &nbsp;

        <Card className="shadow d-block w-100 pb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
          <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#b9f6ca"}}>
            <Grid item xs={9} sm={10} md={11}>
              <div className="input-group pl-3">
                <div className="input-group-prepend ">
                  <span className="input-group-text mt-3 mb-3" style={{backgroundColor: "#0A3D62", borderColor: "#00c853"}} >
                    <MDBIcon className="text-success" icon="search" />
                  </span>
                </div>
                <input className="form-control my-0 py-1 mt-3 mb-3"  style={{backgroundColor: "#f5f5f5", borderColor: "#00c853"}} type="text" placeholder="Search.." aria-label="Search" />
              </div>
            </Grid>
            <Grid item xs={3} sm={2} md={1} >
             
              <div className="ml-3 pt-2 mr-2">
                <Button color="primary"  style={{outline: "none"}}   onClick={handledialogOpen}>
                  <AddCircleRoundedIcon style={{fontSize: 45, color: "#0A3D62"}} />
                </Button>
              </div>

              <Dialog fullScreen open={dialogOpen} onClose={handledialogClose} TransitionComponent={Transition}>
                <AppBar className={classes.popBar}>
                  <Toolbar>
                    <IconButton  style={{outline: "none"}} edge="start" color="inherit" onClick={handledialogClose} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Add Content
                    </Typography>
                    <Button style={{outline: "none"}} color="inherit" onClick={assignContent}>
                      save
                    </Button>
                  </Toolbar>
                </AppBar>
                <List>
                <List dense className={classes.ListViewroot} className="ml-3 mr-3">

                {contents.map((content) => {
                  const labelId = `checkbox-list-secondary-label-${content._id}`;
                  return (
                    <Card style={{marginBottom:5,backgroundColor:"#EAF0F1"}}>
                      <ListItem key={content._id}   button  alignItems="flex-start">  
                      <ListItemIcon>
                            <Checkbox
                              onChange={handleListToggle(content)}
                              checked={checked.indexOf(content._id) !== -1}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={content.topicName} secondary={content.subject} />
                      </ListItem>
                    </Card>
                  );
                })}

                </List>
                </List>
              </Dialog>

            </Grid>
          </Grid>
          {
               plannerContent.map((content)=>{
                 return(
                  <div className="pt-3 pl-3 pr-3" key={content._id}>
                  <Card className="shadow-sm" style={{ backgroundColor: "#eceff1"}}>
                  <Grid  container spacing="0">
                    <Grid item xs={9} sm={10} md={11}>
                      <Link to={`/teacher/contents`} style={{textDecoration: "none"}}><p className="pt-3 pl-3" style={{fontSize: 16, fontWeight: "bold", color: "#000000"}}>{content.subject}
                        <p style={{color: "#039be5", fontWeight: "bold", fontFamily: "comic sans ms", fontSize: 18}}>Topic : {content.topicName}</p></p>
                      </Link>
                    </Grid>
                    <Button className="float-right mt-2 ml-4" style={{outline: "none"}} onClick={removeContent(content._id)}>
                    <RemoveCircleIcon style={{fontSize: 30, color: "#0A3D62"}} />
                  </Button>
                  </Grid>
                 </Card>
                <Divider/>
                </div>
                 )
               })
             }
        </Card>

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


