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
import { Card, Grid, Chip, Popover, Button, TextField } from '@material-ui/core';
import {Link} from "react-router-dom";
import {getUser} from "../../core/helper/UserApiCall";
import { isAuthenticated, SignUp } from '../../auth';
import { API } from "../../backend";
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
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import AddStudent from "../StudentDashboard/AddStudent";
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import FaceIcon from '@material-ui/icons/Face';
import PaymentIcon from '@material-ui/icons/Payment';
import AddTeacher from "../TeacherDashboard/AddTeacher";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { assignInsituteAdmin, getInstitute } from '../helper/adminapicall';

const drawerWidth = 240;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  focustext: {
    '& label.Mui-focused': {
      color: '#00aeef',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#00c853',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00aeef',
      },
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  fullBar: {
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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

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

  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const [tabs, setTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
    classRoom: "",
    password: "",
    error: "",
    publish: false,
    loading: false,
    success: false,
  })
  
  const {firstname, lastname, email, phone, photo, role, classRoom, password, error, publish, loading, success} = myuser;
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

  const [openMasterAdmin, setOpenMasterAdmin] = React.useState(false);

  const handleClickOpenMaster = () => {
    setOpenMasterAdmin(true);
  };

  const handleCloseMaster = () => {
    setOpenMasterAdmin(false);
  };

  const [institute, setinstitute] = useState({
    instituteName: "",
    instituteEmail: "",
    institutePhone: "",
    instituteAdmin: "",
    Iphoto: "",
    insterror: "",
    instloading: false,
    instsuccess: false,
    instformData: new FormData()
  });

  const {instituteName, instituteEmail, institutePhone, Iphoto, instituteAdmin, instformData, insterror, instloading, instsuccess} = institute;

  const InstituteLoad = () => {
    getInstitute(user._id, token, props.match.params.instituteId).then(data => {
      if(data.error){
        setinstitute({...institute, insterror: data.error})
      }else{
        setinstitute({
          ...institute,
          instituteName: data.instituteName,
          instituteEmail: data.instituteEmail,
          institutePhone: data.institutePhone,
          Iphoto: data.Iphoto,
          instituteAdmin: data.instituteAdmin
        })
        getUser(data.instituteAdmin).then(data => {
          if(data.error){
            setMasterInstitute({...MasterInstitute, error: data.error});
          }else{
            setMasterInstitute({
              ...MasterInstitute,
              Ifirstname: data.firstname,
              Ilastname: data.lastname,
              Iemail: data.email,
              Iphone: data.phone,
              Irole: data.role,
              IclassRoom: data.classRoom
            })
          }
        });
      }
    })
  }

  const [MasterInstitute, setMasterInstitute] = useState({
    Ifirstname: "",
    Ilastname: "",
    Iemail: "",
    Iphone: "",
    Ipassword: "",
    Ierror: "",
    Ipublish: false,
    Iloading: false,
    Isuccess: false,
  })
  
  const {Ifirstname, Ilastname, Iemail, Iphone, Ipassword, Ierror, Ipublish, Iloading, Isuccess} = MasterInstitute;

  const onSubmit = event => {
    event.preventDefault();
    setMasterInstitute({...MasterInstitute, error: false, loading: true});

    // request to backend
    assignInsituteAdmin(props.match.params.instituteId, {Ifirstname, Ilastname, Iemail, Iphone, Ipassword})
    .then(data => {
      if(data.error){
        setMasterInstitute({...MasterInstitute, error: data.error, success: false})
      }else{
        setMasterInstitute({
          ...MasterInstitute,
          Ifirstname: "",
          Ilastname: "",
          Iemail: "",
          Iphone: "",
          Ipassword: "",
          Ierror: "",
          Isuccess: true
        });
      }
    })
  };

  const handleAdminInstituteChange = name => event => {
    setMasterInstitute({...MasterInstitute, error: false, [name]: event.target.value});
  }

  useEffect(() => {
    userload(user._id, token);
    InstituteLoad()
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
        &nbsp;

        <div className="mt-1 ml-3 mr-2 mb-4 row hideonmobile" style={{justifyContent: "space-between"}}>
           
            <Card className="pl-2 pr-2 shadow row" style={{borderRadius: 15, backgroundColor: "#0091ea"}}>
              <Card className="shadow-sm my-auto" style={{ borderRadius: 100, width: 30, height: 30, backgroundColor: "#0091ea"}} >
                <img className="d-block w-100 h-100 img-fluid" src={Institute}/>
              </Card>
              <p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>{instituteName}</p>
            </Card>

            <Fab onClick={handleClickOpenMaster} variant="extended" size="medium" className="pl-4 pr-4 ml-2" style={{backgroundColor: "#fb8c00",  outline: "none"}}>
              Master Account
            </Fab>

            <Dialog fullScreen open={openMasterAdmin} onClose={handleCloseMaster} TransitionComponent={Transition}>
              <AppBar className={classes.fullBar} style={{backgroundColor: "#ef6c00"}}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleCloseMaster} aria-label="close" style={{outline: "none"}}>
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Master Account
                  </Typography>
                  <Button autoFocus color="inherit" onClick={onSubmit} style={{outline: "none"}}>
                    Update
                  </Button>
                </Toolbar>
              </AppBar>
            
                &nbsp;&nbsp;
                <form className={classes.focustext} className="" noValidate autoComplete="off">
                  <div className="ml-3 mr-3 mt-4">
                    <TextField className="mb-3" style={{width: "100%"}} type="text" id="firstname" label="First Name" variant="outlined" onChange={handleAdminInstituteChange("Ifirstname")} value={Ifirstname}/> 
                    <TextField className="mb-3" style={{width: "100%"}} type="text" id="lastname" label="Last Name" variant="outlined" onChange={handleAdminInstituteChange("Ilastname")} value={Ilastname}/>
                    <TextField className="mb-3" style={{width: "100%"}} type="email" id="email" label="Email" variant="outlined" onChange={handleAdminInstituteChange("Iemail")} value={Iemail}/> 
                    <TextField className="mb-3" style={{width: "100%"}} type="number" id="phone" label="Phone" variant="outlined" onChange={handleAdminInstituteChange("Iphone")} value={Iphone}/> 
                    <TextField className="mb-3" style={{width: "100%"}} type="password" id="password" label="Password" variant="outlined" onChange={handleAdminInstituteChange("Ipassword")} value={Ipassword}/> 
                  </div>
                </form>
              
            </Dialog>
        </div>
        
        <Divider/>
        &nbsp;

        <Card className="shadow d-block w-100 pb-2" style={{ borderRadius: 12, backgroundColor: "#bdbdbd"}}>

        <Tabs style={{backgroundColor: "#00c853"}}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab style={{outline: "none", color: "#ffffff", fontFamily: "comic sans ms", fontWeight: "bold", fontSize: 18}} label="Teacher's" {...a11yProps(0)} />
          <Tab style={{outline: "none", color: "#ffffff", fontFamily: "comic sans ms", fontWeight: "bold", fontSize: 18}} label="Student's" {...a11yProps(1)} />
        </Tabs>
        
       

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel  style={{overflow: 'auto', maxHeight: 440}} value={value} index={0} dir={theme.direction}>

            <Card className="shadow d-block w-100 h-100 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
              <Grid container spacing="1">
                <Grid item xs={6} sm={6} md={6}>
                  <div className="row p-3">
                  <Chip className="ml-3 mt-2" style={{fontFamily: "comic sans ms", backgroundColor: '#00c853', color: '#ffffff'}} label="Teacher" icon={<FaceIcon style={{color: "#fbe9e7"}}/>} /> 
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                <div className="p-3">
                  <AddTeacher/>
                </div>
                
                </Grid>
              </Grid>
            </Card>

            <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#d1c4e9"}}>
                <Grid item xs={9} sm={10} md={11}>
                  <div className="input-group pl-3">
                    <div className="input-group-prepend ">
                      <span className="input-group-text mt-3 mb-3" style={{backgroundColor: "#0A3D62", borderColor: "#0A3D62"}} >
                        <MDBIcon style={{color: "#ede7f6"}} icon="search" />
                      </span>
                    </div>
                    <input className="form-control my-0 py-1 mt-3 mb-3"  style={{backgroundColor: "#f5f5f5", borderColor: "#512da8"}} type="text" placeholder="Search.." aria-label="Search" />
                  </div>
                </Grid>
                <Grid item xs={3} sm={2} md={1} >
                  <div className="mt-3 ml-2 mb-1 mr-3">
                    <FilterListRoundedIcon style={{fontSize: 40, color: "#424242"}} className="float-right"/>
                  </div>
                </Grid>
              </Grid>
              <div className="pt-3 pl-3 pr-3">
                <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
                  <Grid container spacing="0">
                    <Grid item xs={9} sm={10} md={11}>
                      <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>Anik Roy</p>
                      <p className="pl-3" style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Institute: Haridar class</p>
                    </Grid>
                    <Grid item xs={3} sm={2} md={1}>
                      <MoreVertRoundedIcon className="pt-4 pr-1 float-right" style={{color: "#424242", fontSize: 55}}/>
                    </Grid>
                  </Grid>
                </Card>
              </div>
              &nbsp;
            </Card>

          </TabPanel>
        
          <TabPanel style={{overflow: 'auto', maxHeight: 430}} value={value} index={1} dir={theme.direction}>

            <Card className="shadow d-block w-100 h-100 mt-3 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
              <Grid container spacing="1">
                <Grid item xs={6} sm={6} md={6}>
                  <div className="row p-3">
                    <Chip className="ml-3 mt-2" style={{fontFamily: "comic sans ms", backgroundColor: '#0091ea', color: '#ffffff'}} label="Student" icon={<FaceIcon style={{color: "#ede7f6"}}/>} /> 
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                  <div className="p-3">
                    <AddStudent/>
                  </div>
                </Grid>
              </Grid>
            </Card>

            <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#d1c4e9"}}>
                <Grid item xs={9} sm={10} md={11}>
                  <div className="input-group pl-3">
                    <div className="input-group-prepend ">
                      <span className="input-group-text mt-3 mb-3" style={{backgroundColor: "#0A3D62", borderColor: "#0A3D62"}} >
                        <MDBIcon style={{color: "#ede7f6"}} icon="search" />
                      </span>
                    </div>
                    <input className="form-control my-0 py-1 mt-3 mb-3"  style={{backgroundColor: "#f5f5f5", borderColor: "#512da8"}} type="text" placeholder="Search.." aria-label="Search" />
                  </div>
                </Grid>
                <Grid item xs={3} sm={2} md={1} >
                  <div className="mt-3 ml-2 mb-1 mr-3">
                    <FilterListRoundedIcon style={{fontSize: 40, color: "#424242"}} className="float-right"/>
                  </div>
                </Grid>
              </Grid>
              <div className="pt-3 pl-3 pr-3">
                <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
                  <Grid container spacing="0">
                    <Grid item xs={9} sm={10} md={11}>
                      <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>Debajyoti Debnath</p>
                      <p className="pl-3" style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Grade: class 12
                      <p style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Batch: Haridar class</p>
                      <p style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Institute: ST Pauls</p></p>
                      <Chip className="ml-3 mb-3" icon={<PaymentIcon />} style={{backgroundColor: "#ffffff"}} label="Payment" />
                    </Grid>
                    <Grid item xs={3} sm={2} md={1}>
                      <MoreVertRoundedIcon className="pt-4 pr-1 float-right" style={{color: "#424242", fontSize: 55}}/>
                    </Grid>
                  </Grid>
                </Card>
              </div>
              
              &nbsp;
            </Card>
            
          </TabPanel>
        </SwipeableViews>

        </Card>

        
      </main>
    </div>
  );
}


