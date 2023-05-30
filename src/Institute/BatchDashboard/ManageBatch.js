import React, {useState, useEffect} from 'react';
import { Card, Grid, Divider, Popover,Typography,Button,TextField } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Chip from '@material-ui/core/Chip';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import {getBatch,updateBatch,deleteBatch,getAllBatch,getPlanner,getAllPlanner,createBatch} from "../helper/teacherapicall";
import { getUser } from '../../core/helper/UserApiCall';
import { isAuthenticated } from '../../auth';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BatchLogo from "../../assets/batch.png";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
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
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
  },
  Listroot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: 120,
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



const Batch = (props) => {

  const { window } = props;
  const classes = useStyles();


  const ManageBatch = () => {

 

    const [item, setitem] = useState({
      itemId:"",
      itemName:""
    });
  
    const {itemId,itemName}=item;
  
    const [Batch,setBatch]=useState({
      batchname:"",
      start_time:"",
      end_time:""
    });
    const {batchname,start_time,end_time}=Batch;

    const [Batchs,setBatchs]=useState([]);

    const [fData,setfData]=useState({
      fTitle:"Add Batch",
      createOp:true,
    });

    const {fTitle,createOp}=fData;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePOPUPClick = batch =>  event => {
      setitem({...item,itemId:batch._id,itemName:batch.batchname});
      setAnchorEl(event.currentTarget);
    };
    const handlePOPUPClose = () => {
      setAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setfData({...fData,fTitle:"Add Batch",createOp:true});
      setBatch({
        ...Batch,
        batchname:"",
        start_time:"",
        end_time:""
      });
      setweekdays([]);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
  
    const openPOPUP = Boolean(anchorEl);
    const id = openPOPUP ? 'simple-popover' : undefined;

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

    const [weekdays, setweekdays] = React.useState([]);

    const handleToggle = (value) => () => {
      const currentIndex = weekdays.indexOf(value);
      const newChecked = [...weekdays];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setweekdays(newChecked);
    };
      
    const createThisBatch=event=>{
      event.preventDefault();
      createBatch(user._id,token,user.pannelID,{batchname,start_time,end_time,weekdays}).then(data=>{
        if(data.error){
          console.log('error in db');
        }else{
          setBatch({
            ...Batch,
            batchname:"",
            start_time:"",
            end_time:"",
          
          });
          getAllBatchByClassRoom();
          setOpen(false);
        }
      }).catch(()=>console.log('error'))
    };
  
     const getAllBatchByClassRoom=()=>{
      getAllBatch(user._id,token,user.pannelID).then(data=>{
        if(data.error){
          console.log('error in db');
        }else{
          setBatchs(data);
  
        }
      }).catch(()=>console.log('error'))
     };
  
     const getThisBatch=batchId=>{
      getBatch(user._id,token,user.pannelID,batchId).then(data=>{
        if(data.error){
          console.log('error in db');
        }else{
          setBatch({
            ...Batch,
            batchname:data.batchname,
            start_time:data.start_time,
            end_time:data.end_time 
          });
          setweekdays(data.weekdays);
        }
      }).catch(()=>console.log('error'))
     };
  
  const updateThisBatch=event=>{
    event.preventDefault();
      updateBatch(user._id,token,user.pannelID,itemId,{batchname,start_time,end_time,weekdays}).then(data=>{
        if(data.error){
          console.log('error in db');
        }else{
          setBatch({
            ...Batch,
            batchname:"",
            start_time:"",
            end_time:"",
          
          });
          getAllBatchByClassRoom();
          setOpen(false);
        }
      })
    }
  
    const deleteThisBatch=batchId=>{
        deleteBatch(user._id,token,user.pannelID,batchId).then(data=>{
          if(data.error){
            console.log("error in db");
          }else{
            getAllBatchByClassRoom();
          }
        })
    }

  
    useEffect(() => {
      userload(user._id, token);
      getAllBatchByClassRoom();
    }, []);

    const handleChange=name=>event=>{
    
      setBatch({...Batch,[name]:event.target.value});
    }
  

    const popOverManageCard=()=>{
      return (
        <Popover
                
        id={id}
        open={openPOPUP}
        anchorEl={anchorEl}
        onClose={handlePOPUPClose}
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
          <p className="pl-5 pt-3 pr-5" style={{color: "#00c853",fontFamily: "comic sans ms"}} onClick={()=>{
            setfData({...fData,fTitle:"Update Batch",createOp:false});
            getThisBatch(itemId);
            setOpen(true);
          }}>Update</p>
          <Divider/>
          
            <center><p onClick={()=>{
               confirmAlert({
                title: 'Delete:'+" "+itemName,
                message: 'Are you sure you want to delete.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => deleteThisBatch(itemId)
                  },
                  {
                    label: 'No',
                    onClick: () => {}
                  }
                ]
              });
            }} className="pt-2" style={{color: "#d50000",fontFamily: "comic sans ms"}}>Delete</p></center>

      
        </center>
      </Popover>
      );
    }

    const AddBatch = () => {

     
    
      return (
        <div>
        <Button className="float-right mt-2" style={{outline: "none"}} onClick={handleClickOpen}>
          <AddCircleRoundedIcon style={{fontSize: 45, color: "#0A3D62"}} />
        </Button>
        <Dialog onClose={handleClose}  fullWidth="true"  aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
      <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>{fTitle}</p>
          </DialogTitle>
          <Divider/>
          <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
             <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Batch Name" onChange={handleChange("batchname")} value={batchname} variant="outlined" />
      
             <TextField
          margin="normal"
          id="start_time"
          label="Time picker"
          onChange={handleChange("start_time")} 
          value={start_time}
          type="time" style={{width: "100%"}}
          defaultValue="07:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />

        
<TextField
          margin="normal"
          id="end_time"
          label="Time picker"
          onChange={handleChange("end_time")} 
          value={end_time} style={{width: "100%"}}
          type="time"
          defaultValue="07:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />


<List className={classes.Listroot}>
      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={weekdays.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
           
          </ListItem>
        );
      })}
    </List>

             {/* <div className="form-group pt-2">
                        <select className="form-control" placeholder="Category" onChange={handleChange("planner")} value={planner}>
                        <option value="select">select</option>
                           {Planners.map((planner) => {
                              return(
                                <option value={planner}>{planner.planner_name}</option>
                              ) 
                            })} 
                        </select>
              </div> */}

            {
              createOp==true?(
                <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={createThisBatch}>Create</button>
              ):(
                <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={updateThisBatch}>Update</button>
              )
            }
          </form>
          </DialogContent>
        </Dialog>
      </div>
      );
    }
    

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
                <img src={BatchLogo} style={{width: 40, height: 40}}/>
                <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Batch</p>  
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
                  <img src={BatchLogo} style={{width: 40, height: 40}}/>
                  <p className="pt-2 pl-2 pb-1 " style={{color: "#000000",fontSize: 20}}>Batch</p>  
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6} >
                {AddBatch()}
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
      {Batchs.map((batch)=>{
         var timeBatch = batch.start_time + " " + "to" + " " + batch.end_time;
         return(
          <div key={batch._id} className="pt-3 pl-3 pr-3">
         
          <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
            <Grid container spacing="0">
           
              <Grid item xs={9} sm={10} md={11}>
              <Link to={`/institute/admin/batch/${batch._id}`} style={{textDecoration: "none"}}>
                <p className="pt-3 pl-3" style={{fontWeight: "bold",color:"#000"}}>Time: <text style={{color: "#00c853"}}>{timeBatch}</text>
                <p style={{fontSize: 20, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>{batch.batchname}</p></p>
                </Link>
              </Grid>
              
              <Grid item xs={3} sm={2} md={1}>
                <MoreVertRoundedIcon className="pt-4 pr-1 float-right" style={{color: "#424242", fontSize: 55}} onClick={handlePOPUPClick(batch)}/>
              </Grid>
              {popOverManageCard()}
            </Grid>
          </Card>
       
        </div>
        
       
         )
      })}
        &nbsp;
      </Card>
    </div>
    )

  }

  return (
    <div>
      {ManageBatch()}
    </div>
  )
}

export default Batch;
