import React, {useState, useEffect}  from 'react';
import { Card, Grid, Divider, Button, Popover, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Chip from '@material-ui/core/Chip';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import {Link} from "react-router-dom";
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import {isAuthenticated} from "../../auth/index";
import {getUser} from "../../core/helper/UserApiCall";
import { deleteContent, createContent,getContent,updateContent, getAllNote, deleteNote, getNote, updateNote, createNote, getAllContentByClassRoom } from '../helper/teacherapicall';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAllSubject, getAllGrade, getInstitute} from "../../admin/helper/adminapicall";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Content from "../../assets/content.png";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
  },
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

const Contents = (props) => {

  const { window } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [FData,setFData]=useState({
    primaryView:true,//changes form View
    createContentOperation:true,//else content update op if false
    noteCreateOp:true,//else note update op if false
    buttonName:"Create",//button title
    dialogTitle:"Add Content",//dialog Title
    noteListView:false,//notes list view
    ContentId:"",//content Id
    NoteId:"",//note Id
    backButton:false,//back button from add note view
    addNoteIcon:true,//button to call add note form button
    upNoteBackButton:false//note update back button
  });

  const {primaryView,createContentOperation,noteCreateOp,buttonName,dialogTitle,noteListView,ContentId,NoteId,backButton,addNoteIcon,upNoteBackButton}=FData;

  const [contentTitle,setcontentTitle]=useState("");

  const [Note,setNote]=useState({
    docName:"",
    docurl:"",
    homework:false,
    error:"",
    success:false
  });



  const {docName,docurl,homework}=Note;
  const [Notes,setNotes]=useState([]);

  const handleClick = content => event=> {

    setFData({...FData,
      ContentId:content._id
    });
    setcontentTitle(content.topicName);
    setAnchorEl(event.currentTarget);
   
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const GetContents = ()  => {
    const {user, token} = isAuthenticated();

    const [opens, setOpen] = React.useState(false);


    const handleClickOpen = () => {
      setFData({...FData,
        primaryView:true,
        createContentOperation:true,
        noteCreateOp:true,
        buttonName:"Create",
        dialogTitle:"Add Content",
        noteListView:false,
        backButton:false,
        addNoteIcon:true,
        upNoteBackButton:false
      });
      setContent({...content,
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
            success:false});
      setOpen(true);
    };

    const handleClickClose = () => {
      setFData({...FData,
        primaryView:true,
        createContentOperation:true,
        noteCreateOp:true,
        buttonName:"Create",
        dialogTitle:"Add Content",
        noteListView:false,
        backButton:false,
        addNoteIcon:true,
        upNoteBackButton:false
      });
      setOpen(false);
    };

    

    const [content, setContent] = useState({
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
      error: "",
      success: false,
      loading: false,
    });

    const {topicName, topicDescription, videoLinkOne, videoLinkOneTitle, videoLinkTwo, videoLinkTwoTitle, videoLinkThree, videoLinkThreeTitle, audioLink, audioTitle, subject, success} = content;


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

    const [InstituteLoad, setInstituteLoad] = useState({
      instituteId: "",
      instituteName: "",
      instituteEmail: "",
      institutePhone: "",
      instituteAdmin: "",
      insterror: "",
      instloading: false,
      instsuccess: false,
      instformData: new FormData()
    })
    
    const {instituteId, instituteName, instituteEmail, institutePhone, Iphoto, instituteAdmin, instformData, insterror, instloading, instsuccess} = InstituteLoad;

    const {firstname, lastname, email, phone, photo, role, pannelId} = myuser;

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
                  instituteId: data._id,
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

    const GetContentLoad = (userId, token,classRoom,Id) => {
      getContent(userId, token,classRoom,Id).then(data => {
          if(data.error){
              setContent({
                ...content,
                topicName: data.topicName,
                topicDescription: data.topicDescription,
                videoLinkOne: data.videoLinkOne,
                videoLinkOneTitle: data.videoLinkOneTitle,
                videoLinkTwo: data.videoLinkTwo,
                videoLinkTwoTitle: data.videoLinkTwoTitle,
                videoLinkThree: data.videoLinkThree,
                videoLinkThreeTitle: data.videoLinkThreeTitle,
                audioLink: data.audioLink,
                audioTitle: data.audioTitle,
                subject: data.subject,
              })
          }else{
            setContent(data);
          }
      });
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

    const [getAllcontent, setGetAllcontent] = useState([]);

    const contentLoad = () => {
      getAllContentByClassRoom(user._id, token, user.pannelID).then(datas => {
          if(datas.error){
            console.log(datas.error);
          }else{
            setGetAllcontent(datas);
          }
      });
    };

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
     deleteNote(user._id,token,ContentId,noteid).then(data=>{
       if(data.error){
         console.log("error in DB");
       }else{
        notesLoad(user._id,token,ContentId);
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
     updateNote(user._id,token,NoteId,{docName,docurl,homework}).then(data=>{
      
         if(data.error){
           console.log('error to update data')
         }else{
           setNote({...Note,
             docName:"",
             docurl:"",
             homework:false,
             error:"",
             success:true});
           notesLoad(user._id,token,ContentId);
           setFData({...FData,
            primaryView:false,
            createContentOperation:false,
            noteCreateOp:true,
            buttonName:"Add",
            dialogTitle:"Add Note",
            noteListView:true,
            addNoteIcon:false,
            backButton:true,
            upNoteBackButton:false
         });
         }
         
      
     }).catch(()=>{
      console.log('error in DB');
     })
   };

   const createThisNote=event=>{
     event.preventDefault();
     setNote({...Note,error:"",success:false});
     createNote(user._id,token,ContentId,{docName,docurl,homework}).then(data=>{
      if(data.error){
        setNote({...Note,error:data.error,success:false});
      }else{
        setNote({...Note,
          docName:"",
          docurl:"",
          homework:false,
          error:"",
          success:true});
          notesLoad(user._id,token,ContentId);
      }
    }).catch(()=>console.log("Error in DB"));
   }

    useEffect(() => {
      userload(user._id, token);
      contentLoad();
      subjectLoad(user._id, token);
    }, []);


    const deleteThisContent = ContentId => {
      deleteContent(user._id, token,  user.pannelID, ContentId).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          contentLoad(user._id, token, user.pannelID);
        } 
      });
    };

    const popOverManageCard=()=>{
      return (
        <Popover
                
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
               
               setFData({...FData,
                primaryView:true,
                createContentOperation:false,
                noteCreateOp:true,
                buttonName:"Update",
                dialogTitle:"Update Content",
                noteListView:false,
                addNoteIcon:true,
                backButton:false,
                upNoteBackButton:false
             });
               GetContentLoad(user._id, token,user.pannelID,ContentId);
               setOpen(true);
            }} ><p className="pl-5 pt-3 pr-5" style={{color: "#00c853",fontFamily: "comic sans ms"}}>Update</p></Button></center>
          <Divider/>
          
            <center><Button style={{outline: "none"}} onClick={()=>{
               confirmAlert({
                title: 'Delete:'+" "+contentTitle,
                message: 'Are you sure you want to delete.',
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => deleteThisContent(ContentId)
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

    const onSubmit =  event => {
      event.preventDefault();
      setContent({...content, error:"",loading: true});
      // Backend request
      if(createContentOperation){
      createContent(user._id, token, user.pannelID, { topicName, topicDescription, videoLinkOne, videoLinkOneTitle, videoLinkTwo, videoLinkTwoTitle, videoLinkThree, videoLinkThreeTitle, audioLink, audioTitle, subject})
      .then(data => {
        if(data.error){
            setContent({...content, error: data.error})
        }
        else{
          setContent({
              ...content,
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
              loading: false,
              success: true,
          });
  
          setFData({...FData,
            primaryView:false,
            createContentOperation:false,
            noteCreateOp:true,
            buttonName:"Create",
            dialogTitle:"Add Note",
            noteListView:true,
            ContentId:data._id,
            addNoteIcon:false,
            backButton:true,
            upNoteBackButton:false
         });
         contentLoad();
         setNotes([]);
          
        }
      });
    }else{
      updateContent(user._id, token, user.pannelID,ContentId, { topicName, topicDescription, videoLinkOne, videoLinkOneTitle, videoLinkTwo, videoLinkTwoTitle, videoLinkThree, videoLinkThreeTitle, audioLink, audioTitle, subject})
      .then(data => {
        if(data.error){
            setContent({...content, error: data.error})
        }
        else{
          setContent({
              ...content,
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
              loading: false,
              success: true,
          });
           setFData({...FData,
            primaryView:false,
            createContentOperation:false,
            noteCreateOp:true,
            buttonName:"Create",
            dialogTitle:"Add Note",
            noteListView:true,
            ContentId:data._id,
            NoteId:"",
            addNoteIcon:false,
            backButton:true,
            upNoteBackButton:false
         });
         contentLoad();
         notesLoad(user._id,token,ContentId);
        }
      });
    }
  }

  const handleUploadContent = name => event => {
    setContent({...content, error: false, [name]: event.target.value});
  }

  const handleNoteChange = name => event => {
    let value=name=="homework"?event.target.checked:event.target.value;
    setNote({...Note,[name]:value});
  }
    
  const FormContentCreate=()=>{

    if(primaryView){
    return(
      <form className={classes.root} noValidate autoComplete="off">
                 
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

        <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={onSubmit}>{buttonName}</button>
      
      </form>
    );
   }
   else{
     return (
      <form className={classes.rootForm}  style={{justifyContent:'center',alignItems:'center'}} noValidate autoComplete="off">
      <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document Name" variant="outlined" onChange={handleNoteChange("docName")} value={docName}/>
      <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document URL" variant="outlined" onChange={handleNoteChange("docurl")} value={docurl}/>
       <FormGroup row>
      <FormControlLabel
       control={<Checkbox color="primary"  onChange={handleNoteChange("homework")} checked={homework} />}
       label="Home Work"/>
      </FormGroup>
      {
        (noteCreateOp==true)?(
          <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={createThisNote}>Add</button>
        ):(
          <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={UpdateThisNote}>Update</button>
        )
      }
      </form>
     );
   }
  };

  const successMessage = () => {
    if (success) {
      return (      
      <center> <p className="text-success my-auto" style={{fontFamily: "comic sans ms", fontSize: 16}}>Hi</p></center>
      )
    }
  };
    
  return(
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
                <img src={Content} style={{width: 40, height: 40}}/>
                <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Content</p>  
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
                  <img src={Content} style={{width: 40, height: 40}}/>
                  <p className="pt-1 pl-2 pb-1 " style={{color: "#000000",fontSize: 20}}>Content</p>  
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6} >
                <Button className="float-right mt-2" style={{outline: "none"}} onClick={handleClickOpen}>
                  <AddCircleRoundedIcon style={{fontSize: 45, color: "#0A3D62"}} />
                </Button>
                <Dialog onClose={handleClickClose} fullWidth="true"  aria-labelledby="customized-dialog-title" open={opens}>
                <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>

                {
         (backButton==true)?(
          <Button style={{outline: "none"}} onClick={()=>{
             setNote({...Note,
              docName:"",
              docurl:"",
              homework:false,
             });
             setFData({...FData,
              primaryView:true,
              createContentOperation:false,
              noteCreateOp:true,
              buttonName:"Update",
              dialogTitle:"Update Content",
              noteListView:false,
              addNoteIcon:true,
              backButton:false,
              upNoteBackButton:false
           });
           GetContentLoad(user._id,token,user.pannelID,ContentId);
            
         }}>
         <ArrowBackIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
       }


     {
         (upNoteBackButton==true)?(
          <Button style={{outline: "none"}} onClick={()=>{

            setNote({...Note,
              docName:"",
              docurl:"",
              homework:false,
             });

            setFData({...FData,
              primaryView:false,
              createContentOperation:false,
              noteCreateOp:true,
              buttonName:"Create",
              dialogTitle:"Add Note",
              noteListView:true,
              addNoteIcon:false,
              backButton:true,
              upNoteBackButton:false
           });
             notesLoad(user._id,token,ContentId);

           

         }}>
         <ArrowBackIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
       }

{
         (addNoteIcon==true&&createContentOperation==false)?(
          <Button style={{outline: "none"}} onClick={()=>{

            setFData({...FData,
              primaryView:false,
              createContentOperation:false,
              noteCreateOp:true,
              buttonName:"Create",
              dialogTitle:"Add Note",
              noteListView:true,
              addNoteIcon:false,
              backButton:true,
              upNoteBackButton:false
           });
        

         }}>
         <NoteAddIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
}
                 
     <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>{dialogTitle}</p>
                   
                </DialogTitle>
                <Divider/>
                <DialogContent>
                 
               {FormContentCreate()}
                   
               {
                 (noteListView==true)?(
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
                              setFData({...FData,
                                primaryView:false,
                                createContentOperation:false,
                                noteCreateOp:false,
                                buttonName:"Update",
                                dialogTitle:"Update Note",
                                noteListView:false,
                                NoteId:note._id,
                                addNoteIcon:false,
                                backButton:false,
                                upNoteBackButton:true
                             });
                            noteLoad(user._id,token,note._id);
                             
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
        {getAllcontent.map((content) => {
          return(
          <div>
            <Card className="shadow-sm d-block w-100 h-100 mb-2" style={{ backgroundColor: "#eceff1"}}>
              <Grid  container spacing="0">
                <Grid item xs={9} sm={10} md={11}>
                <Link to={`/institute/admin/content/${content._id}`} style={{textDecoration: "none"}}><p className="pt-3 pl-3" style={{fontSize: 16, fontWeight: "bold", color: "#000000"}}>{content.subject}
                  <p style={{fontSize: 20, fontFamily: "comic sans ms", color: "#039be5"}}>Topic : {content.topicName}</p></p></Link>
                </Grid>
                <Grid item xs={3} sm={2} md={1}>
                  <Button className="float-right mt-3" style={{outline: "none"}} onClick={handleClick(content)}>
                    <MoreVertRoundedIcon style={{color: "#424242", fontSize: 32}}/> 
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
  )}

  return (
    <div>
      {GetContents()}
    </div>
  )
}

export default Contents;
