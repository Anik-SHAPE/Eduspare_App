import React, { useState, useEffect } from 'react';
import { Card, Grid, Divider, Popover, Typography, IconButton, Button, Dialog, TextField, FormControl, InputLabel, Select, MenuItem, AppBar, Toolbar, List } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Chip from '@material-ui/core/Chip';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import {getAllPlannerByClassRoom, deletePlanner, getAllPlanner, getPlanner, updatePlanner, createPlanner} from "../helper/teacherapicall";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { isAuthenticated } from '../../auth';
import { makeStyles, useTheme, withStyles  } from '@material-ui/core/styles';
import { getUser } from '../../core/helper/UserApiCall';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import PlannerImg from "../../assets/planner.png";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  appBar: {
    position: 'relative',
  },
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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


const MyPlanner = () => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [fData,setfData]=useState({
    fTitle:"Add Planner",
    createOp:true,
    PlannerId:"",
    PlannerName:""
  });

  const {fTitle,createOp,PlannerId,PlannerName}=fData;

  const [Planner,setPlanner]=React.useState({
    planner_name:"",
    duration:1
  });
   
  const {planner_name,duration}=Planner;

  const [Planners,setPlanners]=React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {user,token} = isAuthenticated();

  const handleClickOpen = () => {
    setfData({
      ...fData,
      fTitle:"Add Planner",
      createOp:true
    });
    setPlanner({
      ...Planner,
      planner_name:"",
      duration:1
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePopOpen=planner=>event=>{
    setfData({
      ...fData,
      PlannerId:planner._id,
      PlannerName:planner.planner_name
    })
     setAnchorEl(event.currentTarget);
  }

  const handlePopClose=()=>{
    setAnchorEl(null);
  }

  const openPOP = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange=name=>event=>{
    setPlanner({...Planner,[name]:event.target.value});
  }


  const LoadAllPlanners=(userId,token,classroomId)=>{
    getAllPlanner(userId,token,classroomId).then(data=>{
      if(data.error){
        console.log("error to create the polanner");
      }else{
        setPlanners(data);
      }
    }).catch(()=>console.log("error"));
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
      }
    }).catch(()=>console.log('error'))
  };

   const updateThisPlanner=event=>{
     event.preventDefault();
     updatePlanner(user._id,token,user.pannelID,PlannerId,{planner_name,duration}).then(data=>{
       if(data.error){
         console.log('error to update db')
       }else{
         LoadAllPlanners(user._id,token,user.pannelID);
         setOpen(false);
         setAnchorEl(null);
       }
     }).catch(()=>console.log('error'))
   };

   const deleteThisPlanner=plannerId=>{
     deletePlanner(user._id, token, user.pannelID, plannerId).then(data=>{
       if(data.error){
         console.log('error in delete operation');
       }else{
         LoadAllPlanners(user._id,token,user.pannelID);
         setAnchorEl(null);
       }
     })
   }


  const createThisPlanner=event=>{
    event.preventDefault();
    createPlanner(user._id,token,user.pannelID,{planner_name,duration}).then(data=>{
      if(data.error){
        console.log("error to create planner");
      }else{
        LoadAllPlanners(user._id,token,user.pannelID)
        setOpen(false);
      }
    }).catch(()=>console.log("error"));

  }


  const popOverManageCard=()=>{
    return (
      <Popover
              
      id={id}
      open={openPOP}
      anchorEl={anchorEl}
      onClose={handlePopClose}
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
        <Divider/>
        <center><Button style={{outline: "none"}} onClick={()=>{  
          setfData({
            ...fData,
            fTitle:"Update Planner",
            createOp:false,
          })
          setPlanner({
            ...Planner,
            planner_name:"",
            duration:1
          });
         getThisPlanner(PlannerId);
         setOpen(true);
          }} ><p className="pl-5 pt-3 pr-5" style={{color: "#00c853",fontFamily: "comic sans ms"}}>Update</p></Button></center>
        <Divider/>
        
          <center><Button style={{outline: "none"}} onClick={()=>{
             confirmAlert({
              title: 'Delete:'+" "+PlannerName,
              message: 'Are you sure you want to delete.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => deleteThisPlanner(PlannerId)
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
              ]
            });
          }} ><p className="pl-5 pt-3 pr-5" style={{color: "#f44336",fontFamily: "comic sans ms"}}>Delete</p></Button></center>

    
      </center>
    </Popover>
    );
  }

  useEffect(()=>{
    LoadAllPlanners(user._id,token,user.pannelID);
  },[]);

  const AddPlanner = () => {
  
    return (
      <div>
        
      <Button className="float-right mt-2" style={{outline: "none"}} onClick={handleClickOpen}>
        <AddCircleRoundedIcon style={{fontSize: 45, color: "#0A3D62"}} />
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} style={{backgroundColor: "#0091ea"}}>
          <Toolbar>
            <IconButton style={{outline: "none"}} edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {fTitle}
            </Typography>
            
            {
               (createOp==true)?(
                <Button color="inherit" style={{outline: "none"}} onClick={createThisPlanner}>Create</Button>
               ):(
                <Button color="inherit" style={{outline: "none"}} onClick={updateThisPlanner}>Update</Button>
               )
             }
          </Toolbar>
        </AppBar>
        <List className="ml-3 mr-3 mt-2">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField className="mb-3" style={{width: "100%"}} type="text" onChange={handleChange("planner_name")} value={planner_name} label="Planner Name" variant="outlined" />

          <label style={{color:"#000000", fontWeight: "bold", fontSize:18, marginTop:5}} className="pt-3">Duration:</label>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel>Month</InputLabel>
            <Select
              value={duration}
              name="duration"
              onChange={handleChange("duration")}
            >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>

          </Select>
        </FormControl>
        </form>
        </List>
      </Dialog>
      </div>
    );
  }
    

    return (
      <div>
        <div className="hidedesktop fixed-top d-block w-100" style={{height: 70}}>

          <Grid container spacing="1" className="mb-1">
            <Grid item xs={2} sm={6} md={6}>
              <Link to={`/teacher/dashboard`} style={{textDecoration:"none"}}>
              <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
            </Link>
            </Grid>
            <Grid item xs={8} sm={6} md={6}>
              <div className="mt-3 row">
                  <img src={PlannerImg} style={{width: 40, height: 40}}/>
                  <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Planner</p>  
              </div>
            </Grid>
            <Grid item xs={2} sm={6} md={6}>
              <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
            </Grid>
          </Grid>
        </div>

        <div className="hideonmobile">
          <Card className="shadow d-block w-100 h-100 mt-3 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <Grid container spacing="1">
              <Grid item xs={6} sm={6} md={6}>
                <div className="mt-3 ml-3 mb-1 row">
                    <img src={PlannerImg} style={{width: 40, height: 40}}/>
                    <p className="pt-2 pl-2 pb-1 " style={{color: "#000000",fontSize: 20}}>Planner</p>  
                </div>
              </Grid>
              <Grid item xs={6} sm={6} md={6} >
                {AddPlanner()}
              </Grid>
            </Grid>
          </Card>
        </div>
        

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
        {Planners.map((planner) => {
          var timeMonth=planner.duration+" month";
          return(
            <div key={planner._id}>
             
            <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
              <Grid container spacing="0">
             
                <Grid item xs={9} sm={10} md={11}>
                <Link to={`/institute/admin/planner/${planner._id}`} style={{textDecoration: "none"}}>
                  <p  className="pt-3 pl-3" style={{fontSize: 16, fontWeight: "bold",color:"#000"}}>Duration: <text style={{color: "#00c853"}}>{timeMonth}</text>
                  <p style={{fontSize: 22, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>{planner.planner_name}</p></p>
                 </Link>
                </Grid>
            
                <Grid item xs={3} sm={2} md={1}>
                <Button className="float-right mt-1" style={{outline: "none"}} onClick={handlePopOpen(planner)}>
                  <MoreVertRoundedIcon className="pt-4 pr-1 float-right" style={{color: "#424242", fontSize: 55}}/>
                </Button>
                </Grid>
                {popOverManageCard()}
              </Grid>
            </Card>
            
          </div>
          )
        })}
         </div>
        &nbsp;
      </Card>
      </div>
    )
}

export default MyPlanner;
