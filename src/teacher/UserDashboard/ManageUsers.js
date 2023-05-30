import React, {useState, useEffect} from 'react';
import { Card, Grid, Divider, Tabs, Box, Typography, Button, Dialog, DialogTitle, DialogContent, Fab, Slide, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Chip from '@material-ui/core/Chip';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import PaymentIcon from '@material-ui/icons/Payment';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import AddStudent from "./CreateStudent";
import AddTeacher from "./CreateTeacher";
import Users from "../../assets/user.png";
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
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
import CloseIcon from '@material-ui/icons/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  popBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

export default function ManageUsers() {

  const classes = useStyles();

  const [openStudent, setOpenStudent] = React.useState(false);

  const handleStudentOpen = () => {
    setOpenStudent(true);
  };

  const handleStudentClose = () => {
    setOpenStudent(false);
  };

  return (
    <div>

    <div className="hidedesktop fixed-top d-block w-100" style={{height: 70, backgroundColor: "#fafafa"}}>

      <Grid container spacing="1" className="mb-1">
        <Grid item xs={2} sm={6} md={6}>
          <Link to={`/teacher/dashboard`} style={{textDecoration:"none"}}>
          <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
        </Link>
        </Grid>
        <Grid item xs={8} sm={6} md={6}>
          <div className="mt-3 row">
              <img src={UserLogo} style={{width: 40, height: 40}}/>
              <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Student Info</p>  
          </div>
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
        </Grid>
      </Grid>
    </div>

      <div className="ml-1 mr-2  row hideonmobile" style={{justifyContent: "space-between"}}>
          <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#0091ea"}}>
            <p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>Batch Name</p>
          </Card>
          <Fab variant="extended" size="medium" className="pl-4 pr-4 ml-2" style={{backgroundColor: "#00c853", outline: "none"}}>
            <p className="my-auto p-2" style={{fontSize: 13, color: "#000000"}} onClick={handleStudentOpen}>Add Student</p>
              <Dialog  fullScreen open={openStudent} TransitionComponent={Transition} onClose={handleStudentClose}>
                <AppBar className={classes.popBar} style={{backgroundColor: "#00c853"}}>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleStudentClose} aria-label="close" style={{color: "#000000"}}>
                      <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} style={{color: "#000000"}}>
                      Batch Name
                    </Typography>
                    <Button 
                    // onClick={getReplaceClassTopic} 
                    style={{outline: "none", color: "#ffffff"}}>
                      Add Student
                    </Button>
                  </Toolbar> 
                </AppBar>
                <List className="ml-3 mr-3 mt-3" >
                  <form className={classes.root} noValidate autoComplete="off">
                  <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="First Name" variant="outlined" />
                  <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Last Name" variant="outlined" />
                  <TextField className="mb-3" style={{width: "100%"}} type="email" id="text" label="Email" variant="outlined" />
                  <TextField className="mb-3" style={{width: "100%"}} type="number" id="text" label="Phone" variant="outlined" />
                  </form>
                </List>
              </Dialog>
          </Fab>
        </div>

        <div className="hidedesktop">
          <center>
            <Card className="pl-4 pr-4" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 18, color: "#ffffff"}}>Batch Name</p></Card>
          </center>
        </div>
        
        &nbsp;
        <Divider/>
        &nbsp;

      <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
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
            <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
              <Grid container spacing="0">
                <Grid item xs={9} sm={10} md={11}>
                  <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>Debajyoti Debnath</p>
                  <p className="pl-3" style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Grade: class 12</p>
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
    </div>
  )
}



      

