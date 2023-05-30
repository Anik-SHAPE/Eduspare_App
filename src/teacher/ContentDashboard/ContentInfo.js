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
import { Card, Grid, Chip, Popover, TextField, FormGroup, FormControlLabel, Button, DialogContent, ButtonGroup, Dialog, DialogTitle } from '@material-ui/core';
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
import Planner from "../../assets/planner.png";
import Calender from "../../assets/calender.png";
import ReactPlayer from 'react-player';
import { createNote, deleteNote, getAllContentByClassRoom, getAllNote, getContent, getNote, updateContent, updateNote } from '../../Institute/helper/teacherapicall';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Sound from 'react-sound';
import AddDocument from "./AddDocument";
import Chat from "../../student/Chat";
import ChemLogo from "../../assets/phy.jpg";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import GlobalChat from '../Chat/globalchat';
import { getAllSubject } from '../../admin/helper/adminapicall';
import { CheckBox } from 'devextreme-react';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';  
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Paper from '@material-ui/core/Paper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { getTeacher } from '../helper/teacherapicall';


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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: "#4e342e",
  },
}));

export default function MiniDrawer (props) {
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

  const [Note,setNote]=useState({
    docName:"",
    docurl:"",
    homework:false,
    error:"",
    success:false
  });

  const {docName,docurl,homework}=Note;

  const [Notes,setNotes]=useState([]);

  const [open, setOpen] = React.useState(false);

  const [openDialog,setopenDialog]=React.useState(false);

  const [fData,setfData]=useState({
    fTitle:"Update Content",
    fView:true,
    updateNoteView:false,
    backButtonAddNote:false,
    noteaddIcon:true,
    Note_Id:""
  });

  const {fTitle,fView,updateNoteView,backButtonAddNote,noteaddIcon,Note_Id}=fData;

  const handleDialogOpen=()=>{
    setfData({...fData,fTitle:"Update Content",fView:true,updateNoteView:false,noteaddIcon:true})
    setopenDialog(true);
  }

  const handleDialogClose=()=>{
    setfData({...fData,fTitle:"Update Content",fView:true,updateNoteView:false,backButtonAddNote:false,noteaddIcon:true});
    contentLoad(user._id, token, instId, props.match.params.contentId);
    setopenDialog(false);
  }

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

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  
  const {user,token} = isAuthenticated();
  
  const [myuser, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    photo: "",
    error: "",
  })

  const [TeacherLoad, setTeacherLoad] = useState({
    instId: "",
    teacherError: ""
  })

  const {instId} = TeacherLoad;

  const {firstname, lastname, email, phone, photo} = myuser;

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
          })
          getTeacher(user._id, token, user.pannelID).then(data => {
            if(data.error){
              setTeacherLoad({...TeacherLoad, teacherError: data.error})
            }else{
              setTeacherLoad({
                ...TeacherLoad,
                instId: data.instituteId,
              })
            }
          })
        }
    });
  }

  const [getcontent, setGetcontent] = useState({
    topicName:"",
    topicDescription: "",
    videoLinkOne: "",
    videoLinkOneTitle: "",
    videoLinkTwo: "",
    videoLinkTwoTitle: "",
    videoLinkThree: "",
    videoLinkThreeTitle: "",
    audioLink: "",
    audioTitle: "",
    subject: "",
    error: ""
  });

  const{topicName, topicDescription, videoLinkOne, videoLinkOneTitle, videoLinkTwo, videoLinkTwoTitle, videoLinkThree, videoLinkThreeTitle, audioLink, audioTitle, subject} = getcontent;

  const contentLoad = (userId, token, InstituteId, contentId) => {
    getContent(userId, token, InstituteId, contentId).then(data => {
        if(data.error){
          setGetcontent({...getcontent, error: data.error});
        }else{
          setGetcontent({
            ...getcontent,
            topicName: data.topicName,
            topicDescription: data.topicDescription,
            videoLinkOne: data.videoLinkOne,
            videoLinkOneTitle: data.videoLinkOneTitle,
            videoLinkTwo: data.videoLinkTwo,
            videoLinkTwoTitle: data.videoLinkTwoTitle,
            videoLinkThree: data.videoLinkThree,
            videoLinkThreeTitle: data.videoLinkThreeTitle,
            audioTitle: data.audioTitle,
            subject: data.subject,
          })
         
        }
    });
  };

  const UpdateThisContent=event=>{
    event.preventDefault();
    updateContent(user._id, token, instId ,props.match.params.contentId, { topicName, topicDescription, videoLinkOne, videoLinkOneTitle, videoLinkTwo, videoLinkTwoTitle, videoLinkThree, videoLinkThreeTitle, audioLink, audioTitle, subject})
    .then(data => {
      if(data.error){
          setGetcontent({...getcontent, error: data.error})
      }
      else{
        contentLoad();
        setfData({...fData,fTitle:"Add Document",fView:false,updateNoteView:false,backButtonAddNote:true,noteaddIcon:false});
        setNote({...Note,
          docName:"",
          docurl:"",
          homework:false,
        });
      }
    });
  }

  const notesLoad=(userId,token,contentId)=>{
   
    getAllNote(userId,token,contentId).then(data=>{
      if(data.error){
        console.log("error  to load data");
      }else{
        setNotes(data);
      }
    })
 }

 const deleteThisNote=noteid=>{
   deleteNote(user._id,token,props.match.params.contentId,noteid).then(data=>{
     if(data.error){
       console.log("error in DB");
     }else{
      notesLoad(user._id,token,props.match.params.contentId);
     }
   }).catch(()=>console.log("error in deleting note"))
 }

 const noteLoad=(userId,token,noteId)=>{
   setNote({...Note,error:"",success:false});
   getNote(userId,token,noteId).then(data=>{
     if(data.error){
       setNote({...Note,error:data.error,success:false});
     }else{
       setNote({...Note,
         docName:data.docName,
         docurl:data.docurl,
         homework:data.homework,
         error:"",
         success:true});
     }
   }).catch(()=>console.log("error to load"));
 };

  const UpdateThisNote=event=>{
   event.preventDefault();
   setNote({...Note,error:"",success:false});
   updateNote(user._id,token,Note_Id,{docName,docurl,homework}).then(data=>{
    
       if(data.error){
         console.log('error to update data')
       }else{
         setNote({...Note,
           docName:"",
           docurl:"",
           homework:false,
           error:"",
           success:true});
         notesLoad(user._id,token,props.match.params.contentId);
         setfData({...fData,fTitle:"Add Document",fView:false,updateNoteView:false,backButtonAddNote:true,noteaddIcon:false});
       }
       
    
   }).catch(()=>{
    console.log('error in DB');
   })
 };

 const handleNoteChange = name => event => {
  let value=name=="homework"?event.target.checked:event.target.value;
  setNote({...Note,[name]:value});
}

const handleUploadContent = name => event => {
  setGetcontent({...getcontent, error: false, [name]: event.target.value});
}

const onSubmit =  event => {
  event.preventDefault();
  setNote({...Note,error:"",success:false});
  createNote(user._id,token,props.match.params.contentId,{docName,docurl,homework}).then(data=>{
    if(data.error){
      setNote({...Note,error:data.error,success:false});
    }else{
      setNote({...Note,
        docName:"",
        docurl:"",
        homework:false,
        error:"",
        success:true});
        notesLoad(user._id,token,props.match.params.contentId);
    }
  }).catch(()=>console.log("Error in DB"));
 
 
};

const [allSubject, setallSubject] = useState([]);

const subjectLoad = (userId, token) => {
  getAllSubject(userId, token).then(data => {
    if(data.error){
      console.log(data.error);
    }
    else{
      setallSubject(data);
    }
  });
};

  useEffect(() => {
    subjectLoad(user._id, token);
    userload(user._id, token);
    notesLoad(user._id,token, props.match.params.contentId);
    contentLoad(user._id, token, instId, props.match.params.contentId);
  }, []);

  const FormContentCreate=()=>{

    if(fView==true){
      //update form
    return(
      <form className={classes.rootForm} noValidate autoComplete="off">
                 
      <div className="form-group pt-2">
            <select className="form-control" placeholder="Category" onChange={handleUploadContent("subject")} value={subject} >
              <option>Select</option>
              {allSubject.map((subjects, index) => {
                  return(
                    <option>{subjects.subject_name}</option>
                  ) 
                })}
            </select>
      </div>

      <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Topic Name" variant="outlined" onChange={handleUploadContent("topicName")} value={topicName} />
      <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Topic Description" variant="outlined" onChange={handleUploadContent("topicDescription")} value={topicDescription}/>
      
      <Card className="shadow-sm d-block w-100 p-1 mb-3" style={{ backgroundColor: "#e3f2fd"}}>
        <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Title" variant="standard" onChange={handleUploadContent("videoLinkOneTitle")} value={videoLinkOneTitle} />
        <TextField style={{width: "100%"}} type="text" id="text" label="Video Link 1" variant="outlined" onChange={handleUploadContent("videoLinkOne")} value={videoLinkOne} />
      </Card>
      
      <Card className="shadow-sm d-block w-100 p-1 mb-3" style={{ backgroundColor: "#e3f2fd"}}>
        <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Title" variant="standard" onChange={handleUploadContent("videoLinkTwoTitle")} value={videoLinkTwoTitle} />
        <TextField  style={{width: "100%"}} type="text" id="text" label="Video Link 2" variant="outlined" onChange={handleUploadContent("videoLinkTwo")} value={videoLinkTwo}/>
      </Card>
      
      <Card className="shadow-sm d-block w-100 p-1 mb-3" style={{ backgroundColor: "#e3f2fd"}}>
        <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Title" variant="standard" onChange={handleUploadContent("videoLinkThreeTitle")} value={videoLinkThreeTitle} />
        <TextField  style={{width: "100%"}} type="text" id="text" label="Video Link 3" variant="outlined" onChange={handleUploadContent("videoLinkThree")} value={videoLinkThree}/>
      </Card>
      
      <Card className="shadow-sm d-block w-100 p-1 mb-3" style={{ backgroundColor: "#e3f2fd"}}>
        <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Title" variant="standard" onChange={handleUploadContent("audioTitle")} value={audioTitle} />
        <TextField  style={{width: "100%"}} type="text" id="text" label="audio link" variant="outlined" onChange={handleUploadContent("audioLink")} value={audioLink}/>
      </Card>
      

      <div>

    </div> 
      
    <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={UpdateThisContent}>Update</button>
   
    </form>
    );
    }else{
     //note add form
     return (

        <form className={classes.rootForm}  style={{justifyContent:'center',alignItems:'center'}} noValidate autoComplete="off">
          <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document Name" variant="outlined" onChange={handleNoteChange("docName")} value={docName}/>
          <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document URL" variant="outlined" onChange={handleNoteChange("docurl")} value={docurl}/>
           <FormGroup row>
         <FormControlLabel
           control={<CheckBox color="primary"  onChange={handleNoteChange("homework")} checked={homework} />}
           label="Home Work"
        />
        </FormGroup>
        {
          (updateNoteView==true)?(
            <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={UpdateThisNote}>Update</button>
          ):(
            <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={onSubmit}>Add</button>
            )
        }
        </form>
     );
   }
  };

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
                <img className="d-block w-100 h-100 img-fluid" src={`${API}/get-ins-photo/${instId}`}/>
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
                  <img className="d-block w-100 h-100 img-fluid" src={`${API}/get-ins-photo/${instId}`}/>
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
            <Link to="/teacher/dashboard" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Dashboard} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Dashboard</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/teacher/planner" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Planner} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Planner</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to={`/teacher/content`} style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Content} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Content</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item active">
            <Link to="/teacher/batch" style={{textDecoration: 'none'}}>
              <ListItem Button >
                <ListItemIcon>
                    <img src={Batch} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Batch</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/teacher/users" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Users} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Users</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item" className={classes.hover}>
            <Link to="/teacher/billing" style={{textDecoration: 'none'}}>
              <ListItem Button>
                <ListItemIcon>
                    <img src={Calender} width="40px" height="40px"/>
                </ListItemIcon>
                <p className="my-auto" onMouseOver={OnHover} onMouseOut={OnOut}  style={{color: "#000000", fontFamily: "comic sans ms"}}>Calender</p>
              </ListItem>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/teacher/more" style={{textDecoration: 'none'}}>
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

        <Dialog onClose={handleDialogClose} fullWidth="true"  aria-labelledby="customized-dialog-title" open={openDialog}>
          <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          {
         (updateNoteView==true)?(
          <Button style={{outline: "none"}} onClick={()=>{
            setNote({...Note,
              docName:"",
              docurl:"",
              homework:false,
             });
            setfData({...fData,fTitle:"Add Document",fView:false,updateNoteView:false,backButtonAddNote:true,noteaddIcon:false});
            notesLoad(user._id,token,props.match.params.contentId);
         }}>
         <ArrowBackIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
       }


     {
         (backButtonAddNote==true)?(
          <Button style={{outline: "none"}} onClick={()=>{

            setfData({...fData,fTitle:"Update Content",fView:true,updateNoteView:false,backButtonAddNote:false,noteaddIcon:true});

           

         }}>
         <ArrowBackIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
       }

{
         (noteaddIcon==true)?(
          <Button style={{outline: "none"}} onClick={()=>{

            setfData({...fData,fTitle:"Add Document",fView:false,updateNoteView:false,backButtonAddNote:true,noteaddIcon:false});

           

         }}>
         <NoteAddIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
}


                  <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>{fTitle}</p>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                 
               {FormContentCreate()}
               {
                 (updateNoteView==false&&fView==false)?(
                  <Paper style={{width:"100%",height:"auto",padding:5}}>
                  <Grid container spacing={1} className="shadow">
                    
                    <p style={{color:"#2B2B52",fontSize:18,fontWeight:"bolder",margin:8}}>Document List</p>
                  
                          
                     
                   {
                        Notes.map((note)=>{
                          return(
                          <Grid key={note._id} item xs={12}> 
                          <div className="col">
                          <a href={note.docurl} target="_blank" style={{textDecoration:"none"}}>
                          <div style={{backgroundColor:"#e0f7fa",borderRadius:5}}>
                            <p style={{color:"#000",fontWeight:"bold",fontSize:16,marginLeft:5,marginright:5,paddingTop:8,paddingBottom:8}}>{note.docName}</p>
                          </div>
                          </a>
                          <div className="row"  style={{width:"100%",height:'auto',marginLeft:5,marginBottom:5}}>
                            <ButtonGroup  size="small" aria-label="small outlined button group">
                            <Button
                            style={{
                              color:"#000",
                              fontWeight:"bold"
                            }}
                            onClick={()=>{
                             noteLoad(user._id,token,note._id);
                             setfData({...fData,fTitle:"Update Document",fView:false,updateNoteView:true,backButtonAddNote:false,Note_Id:note._id}); 
                            }}
                            startIcon={<EditIcon
                              style={{color:"#10A881"}}
                               />}
                            >Update</Button>
                             <Button
                             style={{
                              color:"#000",
                              fontWeight:"bold"
                            }}
                             onClick={()=>deleteThisNote(note._id)}
                             startIcon={<DeleteForeverIcon
                              style={{color:"#E84342"}}
                            />}
                            >Delete</Button>
                            </ButtonGroup>
                          </div>
                          </div>
                          <Divider light/>
                          </Grid>
                            );
                        })
                    } 
                  
                  </Grid>
                  </Paper>
                 ):null
               }
                    
                </DialogContent>
              </Dialog>



        <div className="hidedesktop fixed-top d-block w-100" style={{height: 70, backgroundColor: "#fafafa"}}>
          <Grid container spacing="1" className="mb-1">
            <Grid item xs={2} sm={6} md={6}>
              <Link to={`/teacher/content`} style={{textDecoration:"none"}}>
              <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
            </Link>
            </Grid>
            <Grid item xs={10} sm={6} md={6}>
              <div className="mt-3 row">
                <Card className="shadow" style={{ borderRadius: 100, width: 40, height: 40}} >
                    <img className="d-block w-100 h-100 img-fluid" src={ChemLogo}/>
                </Card>
                <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>{subject}</p>  
              </div>
            </Grid>
            
          </Grid>
        </div>

        <div className="mt-3 ml-2 mr-2 mb-4 row hideonmobile" style={{justifyContent: "space-between"}}>
          <div className="row">
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>Topic Name: {topicName}</p></Card>
            <Button className="p-2" onClick={handleDialogOpen} style={{outline: "none"}}>
            <EditIcon
                  style={{color:"#10A881"}}
                    />
          </Button>
          </div>
            
            <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
              <div className="row">
                <Card className="shadow-sm my-auto mr-2" style={{ borderRadius: 100, width: 30, height: 30}} >
                  <img className="d-block w-100 h-100 img-fluid" src={ChemLogo}/>
                </Card>
                <p className="my-auto p-1" style={{fontWeight: "bold", fontSize: 25, color: "#000000"}}>{subject}</p>
              </div>
            </Card>
        </div>

        <div className="hidedesktop mb-3">
          <center>
          <Card className="pl-4 pr-4" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 18, color: "#ffffff"}}>{topicName}</p></Card>
          </center>
         
        </div>

        <div className="hidedesktop mb-3">
          <Card className="shadow" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
            <center><p className="pl-2 pt-3" style={{fontFamily: "comic sans ms", fontSize: 20, fontWeight: "bold"}}>Description</p>
            <p className="pl-2 pr-2">{topicDescription}</p></center>
          </Card>
        </div>

        <Divider className="mb-4"/>

        <Grid container spacing="4">
          <Grid item xs={12} sm={6} md={7}>

            <Accordion className="mb-3" style={{borderRadius: 10, backgroundColor: "#ffffff"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>

              <AccordionSummary className="pt-3" expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                
                <p className={classes.heading}>Video Lecture 1: </p>
                <Typography className={classes.secondaryHeading} style={{color:"#000000"}}>
                {videoLinkOneTitle}
                </Typography>
                
              </AccordionSummary>
              <Card className="shadow" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
                <ReactPlayer url = {videoLinkOne} width="100%" controls="true" pip="true" stopOnUnmount={false}/>
              </Card>

            </Accordion>

            <Accordion className="mb-3" style={{borderRadius: 10, backgroundColor: "#ffffff"}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>

              <AccordionSummary className="pt-3"  expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                <p className={classes.heading}>Video Lecture 2: </p>
                <Typography className={classes.secondaryHeading} style={{color:"#000000"}}>
                {videoLinkTwoTitle}
                </Typography>
              </AccordionSummary>
              <Card className="shadow mt-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
                <ReactPlayer url={videoLinkTwo} width="100%" controls="true" pip="true" stopOnUnmount={false}/>
              </Card>

            </Accordion>
                
            <Accordion className="mb-4" style={{borderRadius: 10, backgroundColor: "#ffffff"}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>

              <AccordionSummary className="pt-3" expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                <p className={classes.heading}>Video Lecture 3: </p>
                <Typography className={classes.secondaryHeading} style={{color:"#000000"}}>
                {videoLinkThreeTitle}
                </Typography>
              </AccordionSummary>
              <Card className="shadow mt-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
                <ReactPlayer url={videoLinkThree} width="100%" controls="true" pip="true" stopOnUnmount={false}/>
              </Card>
              
            </Accordion>
            
            <Card style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
              <p className="m-3" style={{color: "#000000"}}>Audio Lecture: {audioTitle}</p>
              <ReactPlayer className="pb-2 pl-3 pr-3"
                  style={{color: "#b0bec5"}}
                  url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
                  width="100%"
                  height="50px"
                  playing={false}
                  controls={true}
                  pip={true}
                />
            </Card>
 
          </Grid>

            <Grid item xs={12} sm={6} md={5} className="mb-5 pb-5">

              <Card className="shadow mb-3 hideonmobile" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
              <center><p className="pl-2 pt-3" style={{fontFamily: "comic sans ms", fontSize: 20, fontWeight: "bold"}}>Description</p>
              <p className="pl-2 pr-2">{topicDescription}</p></center>
              </Card>

           

                   
              <AddDocument content_Id={props.match.params.contentId}/>
      
              
              
            </Grid>
              
          </Grid>

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


