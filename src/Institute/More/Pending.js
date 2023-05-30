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
import { Card, Grid, Chip, Popover, Fab, Dialog, DialogTitle, ListItemAvatar, Avatar, ListItemText, Button, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
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
import BatchLogo from "../../assets/batch.png";
import Users from "../../assets/user.png";
import Planner from "../../assets/planner.png";
import Chat from "../../student/Chat";
import Calender from "../../assets/calender.png";
import GlobalChat from '../Chat/globalchat';
import { getInstitute } from '../../admin/helper/adminapicall';
import { assignPendingClassToHomeWork, getAllBatch, getAllContentByClassRoom, getAllPandingClass } from '../helper/teacherapicall';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { MDBIcon } from 'mdbreact';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import Slide from '@material-ui/core/Slide';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = contentId => {
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const [postOpen, setPostOpen] = React.useState(null);

  const [currentContent, setCurrentContent] = useState()

  const handlePostClick = CurrentContentId => event => {
    setPostOpen(event.currentTarget);
    setCurrentContent(CurrentContentId);
  };

  const handlePostClose = () => {
    setPostOpen(null);
  };

  const postOpens = Boolean(postOpen);
  const ids = postOpens ? 'simple-popover' : undefined;

  const handlePendingOpen = event => {
    event.preventDefault();
    assignPendingClassToHomeWork(user._id, token, BatchId, currentContent).then(data => {
      if(data.error){
        console.log("error in assigning homework");
      }else{
        console.log("HomeWork Succesfully Assigned")
      }
      BatchLoad();
    })
  };

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

  const [openBatch, setOpenBatch] = React.useState(false);

  const handleClickOpen = () => {
    setOpenBatch(true);
  };

  const handleBatchClose = () => {
    setOpenBatch(false);
  };

  const [Batch,setBatch]=useState({
    BatchId: "",
    batchname:"",
    pendingClass: []
  });

  const {BatchId, batchname, pendingClass}=Batch;

  const [Batchs, setBatchs] = useState([]);

  const [getAllPendingClasses, setGetAllPendingClasses] = useState([]);

  const BatchLoad = () => {
    getAllBatch(user._id, token, user.pannelID).then(data => {
        if(data.error){
            console.log("error in loading batch");
        }
        else{
          setBatchs(data)
          setBatch({
            ...Batch,
            BatchId:data[0]._id,
            batchname:data[0].batchname,
            pendingClass:data[0].pendingClass
          })
        }
    })
  } 

  const handleListItemClick = batch => ()=> {
    
    setBatch({
      ...Batch,
      BatchId:batch._id,
      batchname:batch.batchname,
      pendingClass:batch.pendingClass
    });

    getAllPandingClass(user._id, token, BatchId).then(data => {
      if(data.error){
        console.log("error in loading pending classes")
      }else{
        setGetAllPendingClasses(data)
      }
    })
    setOpen(false);
  };
  
  useEffect(() => {
    userload(user._id, token);
    BatchLoad();
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
                    <img src={Planner} width="40px" height="40px"/>
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
        &nbsp;&nbsp;

        <div className="ml-1 mr-2  row hideonmobile" style={{justifyContent: "space-between"}}>

            <Fab variant="extended" onClick={handleClickOpen}  style={{backgroundColor: "#0091ea", color: "#ffffff", outline: "none"}}>{batchname}</Fab>
            
            <Dialog onClose={handleBatchClose} aria-labelledby="Add Batch" open={openBatch}>
    
                <DialogTitle id="simple-dialog-title">Select Batch</DialogTitle>
                <List>
        
                    {Batchs.map((batches) => (
                    <ListItem button onClick={handleListItemClick(batches)}>
                        <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={batches.batchname} />
                    </ListItem>
                    ))}
            
                    <ListItem autoFocus button onClick={() => handleListItemClick('Select Batch')}>
                    </ListItem>
                </List>
            </Dialog>

            
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
                <div className="row">
                    <Card className="shadow-sm my-auto mr-2" style={{ borderRadius: 100, width: 30, height: 30}} >
                    <img className="d-block w-100 h-100 img-fluid" src={BillingIcon}/>
                    </Card>
                    <p className="my-auto p-1" style={{fontWeight: "bold", fontSize: 25, color: "#000000"}}>Pending Classes</p>
                </div>
            </Card>

        </div>

        &nbsp;&nbsp;
        <Divider/>
        &nbsp;&nbsp;

        <Card className="shadow d-block w-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#b9f6ca"}}>
                <Grid item xs={9} sm={10} md={11}>
                <div className="input-group pl-3">
                    <div className="input-group-prepend ">
                    <span className="input-group-text mt-3 mb-3" style={{backgroundColor: "#0A3D62", borderColor: "#00c853"}} >
                        <MDBIcon style={{color: "#00c853"}} icon="search" />
                    </span>
                    </div>
                    <input className="form-control my-0 py-1 mt-3 mb-3"  style={{backgroundColor: "#f5f5f5", borderColor: "#00c853"}} type="text" placeholder="Search.." aria-label="Search" />
                </div>
                </Grid>
                <Grid item xs={3} sm={2} md={1} >
                <div className="mt-3 ml-2 mb-1 mr-3">
                    <FilterListRoundedIcon style={{fontSize: 40, color: "#424242"}} className="float-right"/>
                </div>
                </Grid>
            </Grid>
            <div className="pt-3 pl-3 pr-3">
              {getAllPendingClasses.map((pendingData) => {
                return(
                  <Card className="shadow-sm d-block w-100 h-100 mb-2" style={{ backgroundColor: "#eceff1"}}>
                    <Grid  container spacing="0">
                        <Grid item xs={9} sm={10} md={11}>
                        <p className="pt-3 pl-3" style={{fontSize: 16, fontWeight: "bold", color: "#000000"}}>{pendingData.topicName}
                        <p style={{fontSize: 20, fontFamily: "comic sans ms", color: "#039be5"}}>Batch Name</p></p>
                        </Grid>
                        <Grid item xs={3} sm={2} md={1}>
                        <Button onClick={handlePostClick(pendingData._id)} className="float-right mt-3" style={{outline: "none"}}>
                            <MoreVertRoundedIcon style={{color: "#424242", fontSize: 32}}/> 
                        </Button> 

                        <Popover className="mt-2" style={{borderRadius: 20}}
                          id={ids}
                          open={postOpens}
                          anchorEl={postOpen}
                          onClose={handlePostClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <center>
                            <Button onClick={handlePendingOpen} className="d-block w-100" style={{color: "#00c853", outline: "none"}}>
                              <p className="mt-3 ml-4 mr-4">Assign</p>
                            </Button>
                            <Divider/>
                            <Button className="d-block w-100" style={{color: "#d50000"}}>
                              <p className="mt-3 ml-4 mr-4">Remove</p>
                            </Button>
                          </center>
                        </Popover>
                        </Grid>
                    </Grid>
                  </Card>
                 )
              })}

            </div>
            &nbsp;

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


