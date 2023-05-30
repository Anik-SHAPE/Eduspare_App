import React, {useState, useEffect} from 'react';
import { Card, Grid, Divider, Chip } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated } from '../../auth';
import { getUser } from '../../core/helper/UserApiCall';
import { getAllInstitute, registerInstitute, getInstitute, instituteUpdate} from '../helper/adminapicall';
import Popover from '@material-ui/core/Popover';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import { getAllPackage } from '../../Institute/helper/teacherapicall';

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


const Contents = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [fData,setfData]=useState({
    InsId:""
  })  

  const {InsId}=fData;
  
  const handleInstituteActionClick = data => event => {
    
    setfData({...fData,InsId:data._id});
    setinstitute({
      ...institute,
      instituteName: data.instituteName,
      instituteEmail: data.instituteEmail,
      institutePhone: data.institutePhone,
      instituteAdmin: data.instituteAdmin
    });
    setAnchorEl(event.currentTarget);
  };

  const handleInstituteActionClose = () => {
    setAnchorEl(null);
  };

  const opens = Boolean(anchorEl);
  const id = opens ? 'simple-popover' : undefined;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

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


  const [institute, setinstitute] = useState({
    instituteName: "",
    instituteEmail: "",
    institutePhone: "",
    instituteAdmin: "",
    Iphoto: "",
    error: "",
    loading: false,
    success: false,
    formData: new FormData()
  });

  const {instituteName, instituteEmail, institutePhone, Iphoto, instituteAdmin, formData, error, loading, success} = institute;

  const onSubmit = event => {
    event.preventDefault();
    setinstitute({...institute, error:"", loading: true});

    // Backend request to create Institute
    registerInstitute(formData)
      .then(data=>{
          if(data.error){
          console.log("error in db");
          }
          else{
            setinstitute({
              ...institute,
              instituteName: "",
              instituteEmail: "",
              institutePhone: "",
              Iphoto: null,
              loading: false,
              success: true
            });
            InstituteLoad();
          }
    });
  };

  const handleChange = name => event => {
    const value = name === "Iphoto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setinstitute({...institute, [name]: value});
  }

  const handleUpdateChange = name => event => {
    const value = name === "Iphoto" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setinstitute({...institute, [name]: value});
  }

  const [getMyInstitute, setGetInstitute] = useState([]);

  const InstituteLoad = () => {
    getAllInstitute(user._id, token).then(data => {
      if(data.error){
        console.log("Insitute Loading error")
      }else{
        setGetInstitute(data)
      }
    })
  }

  const [openInstitute, setOpenInstitute] = React.useState(false);

  const handleUpdateIntituteClickOpen = () => {
    setOpenInstitute(true);
  };

  const handleUpdateIntituteClose = () => {
    setOpenInstitute(false);
  }

  const handleUpdateIntitute = event => {
    event.preventDefault();
    setinstitute({...institute, error:"", loading: true});

    //Backend Request Update
    instituteUpdate(user._id, token, InsId, formData)
    .then(data => {
      if(data.error){
        setinstitute({...institute, error: data.error});
      }else{
        setinstitute({
          ...institute,
          instituteName: "",
          instituteEmail: "",
          institutePhone: "",
          Iphoto: "",
          loading: false,
          success: true
        })
        setOpenInstitute(false);
      }
      InstituteLoad();
    })
  };

  useEffect(() => {
    InstituteLoad();
    userload(user._id, token);
  }, []);


  return (
    <div>
      <Card className="shadow d-block w-100 h-100 mt-3 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
        <Grid container spacing="1">
          <Grid item xs={6} sm={6} md={6}>
            <div className="row p-3">
            <Chip className="ml-3 mt-2" style={{fontFamily: "comic sans ms", backgroundColor: '#2e7d32', color: '#ffffff'}} label="Institute" icon={<SchoolRoundedIcon name="bar-chart" style={{color: "#e0f2f1"}}/>} /> 
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} >
          <div className="p-3">
            <Button className="float-right mb-3" style={{outline: "none"}} onClick={handleClickOpen}>
              <Chip  style={{fontFamily: "comic sans ms", backgroundColor: '#03a9f4', color: '#ffffff'}} label="Add"/> 
            </Button>
            <Dialog onClose={handleClose}  fullWidth="true"  aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>Add Institute</p>
              </DialogTitle>
              <Divider/>
              <DialogContent>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField className="mb-3" style={{width: "100%"}} type="text" id="instituteName" label="Institute Name" variant="outlined" onChange={handleChange("instituteName")} value={instituteName}/> 
                <TextField className="mb-3" style={{width: "100%"}} type="text" id="instituteEmail" label="Institute Email" variant="outlined" onChange={handleChange("instituteEmail")} value={instituteEmail}/>
                <TextField className="mb-3" style={{width: "100%"}} type="text" id="institutePhone" label="Institute Phone" variant="outlined" onChange={handleChange("institutePhone")} value={institutePhone}/> 
                <h6 className="text-success">Upload Image</h6> 
                <input onChange={handleChange("Iphoto")} type="file" name="Iphoto" accept="image" />
                <Button onClick={onSubmit} className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}}>Create</Button>
              </form>
              </DialogContent>
            </Dialog>
          </div>
          </Grid>
        </Grid>
      </Card>

      <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
      <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#c8e6c9"}}>
          <Grid item xs={9} sm={10} md={11}>
            <div className="input-group pl-3">
              <div className="input-group-prepend ">
                <span className="input-group-text mt-3 mb-3" style={{backgroundColor: "#0A3D62", borderColor: "#0A3D62"}} >
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
        {getMyInstitute.map((data) => {
          return(
            <div className="pt-3 pl-3 pr-3">
                  <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
                    <Grid container spacing="0">
                      <Grid item xs={9} sm={10} md={11}>
                        <Link to={`/admin/institute-info/${data._id}`} style={{textDecoration: "none"}}>
                          <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>{data.instituteName}</p>
                          <p className="pl-3" style={{fontSize: 15, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Teachers: 20
                          <p style={{fontSize: 15, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Students: 100</p></p>
                        </Link>
                      </Grid>
                      <Grid item xs={3} sm={2} md={1}>
                        <Button  className="pt-4 pr-1 float-right" onClick={handleInstituteActionClick(data)} style={{outline: "none"}} >
                          <MoreVertRoundedIcon style={{color: "#424242", fontSize: 30}}/>
                        </Button>
                          <Popover className="mt-4" style={{borderRadius: 20}}
                            id={id}
                            open={opens}
                            anchorEl={anchorEl}
                            onClose={handleInstituteActionClose}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                          <Card>
                          <center>
                            <Button style={{ outline: "none" }}>
                              <p className="pl-5 pt-3 pr-5" onClick={() => {handleUpdateIntituteClickOpen()}} 
                              style={{color: "#00c853", fontFamily: "comic sans ms", outline: "none" }}>Update</p>
                            </Button>
                          </center>
                          <Divider/>
                            <Button style={{outline: "none"}} >
                              <p className="pl-5 pt-3 pr-5" style={{color: "#d50000", fontFamily: "comic sans ms"}}>Inactive</p>
                            </Button>
                          </Card>
                        </Popover>
                        <Dialog fullScreen open={openInstitute} onClose={handleUpdateIntituteClose} TransitionComponent={Transition}>
                          <AppBar className={classes.appBar} style={{backgroundColor: "#00c853"}}>
                            <Toolbar>
                              <IconButton edge="start" color="inherit" onClick={handleUpdateIntituteClose} style={{outline: "none"}} aria-label="close">
                                <CloseIcon />
                              </IconButton>
                              <Typography variant="h6" className={classes.title}>
                                {instituteName}
                              </Typography>
                              <Button autoFocus color="inherit" onClick={handleUpdateIntitute} style={{outline: "none"}}>
                                Update
                              </Button>
                            </Toolbar>
                          </AppBar>
                          <List>
                          <form className={classes.root} noValidate autoComplete="off">
                            <div className="ml-3 mr-3 mt-4">
                              <TextField className="mb-3" style={{width: "100%"}} type="text" id="instituteName" label="Institute Name" variant="outlined" onChange={handleUpdateChange("instituteName")} value={instituteName}/> 
                              <TextField className="mb-3" style={{width: "100%"}} type="text" id="instituteEmail" label="Institute Email" variant="outlined" onChange={handleUpdateChange("instituteEmail")} value={instituteEmail}/>
                              <TextField className="mb-3" style={{width: "100%"}} type="text" id="institutePhone" label="Institute Phone" variant="outlined" onChange={handleUpdateChange("institutePhone")} value={institutePhone}/> 
                              <h6 className="text-success">Upload Image</h6> 
                              <input onChange={handleUpdateChange("Iphoto")} type="file" name="Iphoto"/>
                            </div>
                          </form>
                          </List>
                        </Dialog>
                      </Grid>
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

export default Contents;
