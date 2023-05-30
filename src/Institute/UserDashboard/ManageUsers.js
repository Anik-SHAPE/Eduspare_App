import React, {useState, useEffect} from 'react';
import { Card, Grid, Divider, Tabs, Box, Typography, Fab, ListItemText } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Chip from '@material-ui/core/Chip';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import PaymentIcon from '@material-ui/icons/Payment';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import Users from "../../assets/user.png";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import FaceIcon from '@material-ui/icons/Face';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LogoDB from "../../assets/dblogo.png";
import Signout from "../../core/Signout";
import {getUser} from "../../core/helper/UserApiCall";
import { isAuthenticated } from '../../auth';
import { API } from "../../backend";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import "../../styles.css";
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SwipeableViews from 'react-swipeable-views';
import UserLogo from "../../assets/user.png";
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { createTeacher } from '../helper/teacherapicall';
import { getInstitute } from '../../admin/helper/adminapicall';

const useStyles = makeStyles((theme) => ({
  root: {
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
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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



export default function ManageUsers() {

  
  const [myuser, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    photo: "",
    role: "",
    error: "",
    pannelId: "",
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
  
  useEffect(() => {
    userload(user._id, token);
  }, []);

  const theme = useTheme();

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [openTeacher, setOpenTeacher] = React.useState(false);

  const handleTeacherClickOpen = () => {
    setOpenTeacher(true);
  };

  const handleTeacherClose = () => {
    setOpenTeacher(false);
  };

  const [openStudent, setStudentOpen] = React.useState(false);

  const handleStudentClickOpen = () => {
    setStudentOpen(true);
  };

  const handleStudentClose = () => {
    setStudentOpen(false);
  };
 
  const [CreateUser, setCreateUser] = useState({
    teacherfirstName : "",
    teacherlastName : "",
    teacherEmail : "",
    error : "",
    loading: false,
    success: false
  });

  const {teacherfirstName, teacherlastName, teacherEmail, error, loading, success} = CreateUser
  
  const TeacherCreate =  event => {
    event.preventDefault();
    setCreateUser({...CreateUser, error:"", loading: true});
    //Backend Request
    createTeacher(user._id, token, user.pannelID, {teacherfirstName, teacherlastName, teacherEmail}).then(data => {
      if(data.error){
        setCreateUser({...CreateUser, error: data.error})
      }else{
        setCreateUser({
          ...CreateUser,
          teacherfirstName: "",
          teacherlastName: "",
          teacherEmail: "",
          loading: false,
          success: true,
        })
      }
    })
  }

  const handleTeacherChange = name => event => {
    setCreateUser({...CreateUser, error: false, [name]: event.target.value});
  }

  return (
    <div>
      &nbsp;
      <Divider/>
      &nbsp;

      <Card className="shadow d-block w-100 pb-2" style={{ borderRadius: 12, backgroundColor: "#e1f5fe"}}>

      <Tabs style={{backgroundColor: "#00c853"}}
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab style={{outline: "none", color: "#ffffff", fontFamily: "comic sans ms", fontWeight: "bold", fontSize: 18}} label="Teacher" {...a11yProps(0)} />
        <Tab style={{outline: "none", color: "#ffffff", fontFamily: "comic sans ms", fontWeight: "bold", fontSize: 18}} label="Student" {...a11yProps(1)} />
      </Tabs>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel  style={{overflow: 'auto', maxHeight: 440}} value={value} index={0} dir={theme.direction}>

          <Card className="shadow d-block w-100 h-100 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <Grid container spacing="1">
              <Grid item xs={9} sm={10} md={10}>
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
              <Grid item xs={6} sm={6} md={1} >
                <div className="p-3" >
                <Fab style={{outline: "none", backgroundColor: "#0091ea", width: 40, height: 40}} onClick={handleTeacherClickOpen}>
                  <AddIcon />
                </Fab>
                <Dialog fullScreen open={openTeacher} onClose={handleTeacherClose} TransitionComponent={Transition}>
                  <AppBar className={classes.appBar} style={{backgroundColor: "#0091ea"}}>
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={handleTeacherClose} aria-label="close" style={{outline: "none"}}>
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        Create Teacher
                      </Typography>
                      <Button autoFocus color="inherit" onClick={TeacherCreate} style={{outline: "none"}}>
                        save
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <List className="mt-3 ml-3 mr-3">
                    <form className={classes.root} noValidate autoComplete="off">
                      <TextField className="mb-2" style={{width: "100%"}} type="text" id="instituteName" label="First Name" variant="outlined" onChange={handleTeacherChange("teacherfirstName")} value={teacherfirstName}/> 
                      <TextField className="mb-2" style={{width: "100%"}} type="text" id="instituteName" label="Last Name" variant="outlined" onChange={handleTeacherChange("teacherlastName")} value={teacherlastName}/> 
                      <TextField className="mb-2" style={{width: "100%"}} type="text" id="instituteName" label="Email Address" variant="outlined" onChange={handleTeacherChange("teacherEmail")} value={teacherEmail}/> 
                    </form>
                  </List>
                </Dialog>
    
                </div>
              
              </Grid>
            </Grid>
          </Card>

          <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
          {/* <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#b9f6ca"}}>
             
            </Grid> */}
            <div className="pt-3 pl-3 pr-3">
              <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
                <Grid container spacing="0">
                  <Grid item xs={9} sm={10} md={11}>
                    <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>Anik Roy
                    <p style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Institute: Brainware University</p></p>
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

          <Card className="shadow d-block w-100 h-100 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <Grid container spacing="1">
              <Grid item xs={9} sm={10} md={10}>
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
              <Grid item xs={6} sm={6} md={1} >
                <div className="p-3">
                <Fab style={{outline: "none", backgroundColor: "#0091ea", width: 40, height: 40}} onClick={handleStudentClickOpen}>
                  <AddIcon />
                </Fab>
                <Dialog fullScreen open={openStudent} onClose={handleStudentClose} TransitionComponent={Transition}>
                  <AppBar className={classes.appBar} style={{backgroundColor: "#0091ea"}}>
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={handleStudentClose} aria-label="close" style={{outline: "none"}}>
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        Create Student
                      </Typography>
                      <Button autoFocus color="inherit" onClick={handleStudentClose} style={{outline: "none"}}>
                        save
                      </Button>
                    </Toolbar>
                  </AppBar>
                  <List className="ml-3 mr-3 mt-3">
                    <form className={classes.root} noValidate autoComplete="off">
                      <TextField className="mb-2" style={{width: "100%"}} type="text" id="instituteName" label="First Name" variant="outlined"/> 
                      <TextField className="mb-2" style={{width: "100%"}} type="text" id="instituteName" label="Last Name" variant="outlined"/> 
                      <TextField className="mb-2" style={{width: "100%"}} type="text" id="instituteName" label="Email Address" variant="outlined"/> 
                    </form>
                  </List>
                </Dialog>
    
                </div>
              </Grid>
            </Grid>
          </Card>

          <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <div className="pt-3 pl-3 pr-3">
              <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
                <Grid container spacing="0">
                  <Grid item xs={9} sm={10} md={11}>
                    <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>Debajyoti Debnath</p>
                    <p className="pl-3" style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Grade: class 12
                    <p style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Batch: Haridar class</p></p>
                   
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
    </div>
  )
}



      

