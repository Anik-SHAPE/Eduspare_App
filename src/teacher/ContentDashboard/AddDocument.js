import React, {useState, useEffect}  from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import Chip from '@material-ui/core/Chip';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {isAuthenticated} from "../../auth/index";
import { createNote,getAllNote,updateNote,deleteNote,getNote } from '../helper/teacherapicall';
import {getUser} from "../../core/helper/UserApiCall";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { confirmAlert } from 'react-confirm-alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor:"#fff"
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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




const AddDocument = ({content_Id}) => {

const [open, setOpen] = React.useState(false);
const [Note,setNote]=useState({
  docName:"",
  docurl:"",
  homework:false,
  error:"",
  success:false
});
const {docName,docurl,homework}=Note;
const [Notes,setNotes]=useState([]);
const [fData,setfData]=useState({
  formTitle:"Add Document",
  formAdd:true,
  note_Id:""
});
const {formTitle,formAdd,note_Id}=fData;


  const handleClickOpen = () => {
    notesLoad(user._id,token,content_Id);
    setOpen(true);
  };
  const handleClose = () => {
    setfData({...fData,formTitle:"Add Document",formAdd:true});
    setOpen(false);
  };

  const theme = useTheme();
  
  const [myuser, setUser] = useState({
    classRoom: "",
    error: "",
  })

  // const {classRoom} = myuser;

  // const userload = (userId, token) => {
  //   getUser(userId, token).then(data => {
  //       if(data.error){
  //           setUser({...myuser, error: data.error});
  //       }else{
  //           setUser({
  //               ...myuser,
  //               classRoom: data.classRoom
  //           })
  //       }
  //   });
  // };

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
    deleteNote(user._id,token,content_Id,noteid).then(data=>{
      if(data.error){
        console.log("error in DB");
      }else{
      notesLoad(user._id,token,content_Id);
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
  

  useEffect(() => {
  
   // userload(user._id, token);
    notesLoad(user._id,token,content_Id);
   
  }, []);



  const {user, token} = isAuthenticated();

  const onSubmit =  event => {
    event.preventDefault();
    setNote({...Note,error:"",success:false});
    createNote(user._id,token,content_Id,{docName,docurl,homework}).then(data=>{
      if(data.error){
        setNote({...Note,error:data.error,success:false});
      }else{
        setNote({...Note,
          docName:"",
          docurl:"",
          homework:false,
          error:"",
          success:true
        });
        notesLoad(user._id,token,content_Id);
      }
    }).catch(()=>console.log("Error in DB"));
   
   
  };

  const UpdateThisNote=event=>{
     event.preventDefault();
    setNote({...Note,error:"",success:false});
    updateNote(user._id,token,note_Id,{docName,docurl,homework}).then(data=>{
     
        if(data.error){
          console.log('error to update data')
        }else{
          setNote({...Note,
            docName:"",
            docurl:"",
            homework:false,
            error:"",
            success:true});
          notesLoad(user._id,token,content_Id);
          setfData({...fData,formTitle:"Add Document",formAdd:true});
        }
        
     
    }).catch(()=>{
     console.log('error in DB');
    })
  };
  

 

  const handleChange = name => event => {
    let value=name=="homework"?event.target.checked:event.target.value;
    setNote({...Note,[name]:value});
  }

 

  

  const classes = useStyles();

  return (
    <div>
     
      


      <Card className="shadow mb-5 pl-2 pr-2" style={{ borderRadius: 12, backgroundColor: "#fff" }}>
                <div className="pl-2 row" style={{justifyContent: "space-between"}}> 
                  <p className="m-2 "  style={{fontFamily: "comic sans ms", fontSize: 20, fontWeight: "bold", color:"#000"}}>Documents</p>
                  <Button className="float-right mt-2" style={{outline: "none"}} onClick={handleClickOpen}>
                  <AddCircleRoundedIcon style={{fontSize: 25, color: "#0A3D62"}} />
                  </Button>

                </div>
                
                <Divider/>
                &nbsp;

              
                  <Grid container spacing={1}>
                    
                          
                     
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
              
                  &nbsp;

              </Card>





      <Dialog onClose={handleClose} fullWidth="true"  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
       {
         formAdd!=true?(
          <Button style={{outline: "none"}} onClick={()=>{
            setNote({...Note,
              docName:"",
              docurl:"",
              homework:false,
              error:"",
             });
            setfData({...fData,formTitle:"Add Document",formAdd:true});
            notesLoad(user._id,token,content_Id);
         }}>
         <ArrowBackIcon style={{fontSize: 25, color: "#000"}} />
        </Button>
         ):null
       }
        <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>{formTitle}</p>
        </DialogTitle>
        <Divider/>
        <DialogContent>

       {
         formAdd==true?(
          <form className={classes.root} style={{justifyContent:'center',alignItems:'center'}} noValidate autoComplete="off">
          <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document Name" variant="outlined" onChange={handleChange("docName")} value={docName}/>
          <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document URL" variant="outlined" onChange={handleChange("docurl")} value={docurl}/>
           <FormGroup row>
         <FormControlLabel
           control={<Checkbox color="primary"  onChange={handleChange("homework")} checked={homework} />}
           label="Home Work"
     />
   </FormGroup>
   <button type="submit" className="nav-link mt-1 mb-3 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={onSubmit}>Create</button>
   </form>
         ):(
          <form className={classes.root} style={{justifyContent:'center',alignItems:'center'}} noValidate autoComplete="off">
          <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document Name" variant="outlined" onChange={handleChange("docName")} value={docName}/>
          <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Document URL" variant="outlined" onChange={handleChange("docurl")} value={docurl}/>
           <FormGroup row>
         <FormControlLabel
           control={<Checkbox color="primary"  onChange={handleChange("homework")} checked={homework} />}
           label="Home Work"
     />
   </FormGroup>
   <button type="submit" className="nav-link mt-1 mb-3 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={UpdateThisNote}>Save</button>
   </form>
         )

       }

    {
      formAdd==true?(
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
              setfData({...fData,formTitle:"Update Document",formAdd:false,note_Id:note._id});  
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
    </div>
  );
}

export default AddDocument;
