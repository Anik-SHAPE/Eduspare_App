import React, {useState, useEffect}  from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
import { Divider } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import Chip from '@material-ui/core/Chip';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import {isAuthenticated} from "../../auth/index";
import { createContent } from '../helper/teacherapicall';
import {getUser} from "../../core/helper/UserApiCall";
import {getAllSubject, getAllGrade} from "../../admin/helper/adminapicall";


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




const AddPlanner = () => {

  const [open, setOpen] = React.useState(false);
  const [list, setlist] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [allgrade, setallgrade] = useState([]);

  const gradeLoad = (userId, token) => {
    getAllGrade(userId, token).then(data => {
      if(data.error){
        console.log(data.error)
      }
      else{
        setallgrade(data);
      }
    })
  };


  const theme = useTheme();

  const [getGrade, setGetGrade] = React.useState([{
      error: "",
      success: false,
      loading: false
    }
  ]);

  const handleChange  = name => event =>{
    setGetGrade([ ...getGrade, {error: false, [name]: event.target.value }]);
  };


  
  const [myuser, setUser] = useState({
    classRoom: "",
    error: "",
  })

  const {classRoom} = myuser;

  const userload = (userId, token) => {
    getUser(userId, token).then(data => {
        if(data.error){
            setUser({...myuser, error: data.error});
        }else{
            setUser({
                ...myuser,
                classRoom: data.classRoom
            })
        }
    });
  }

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
    gradeLoad(user._id,token);
    userload(user._id, token);
    subjectLoad(user._id, token);
  }, []);


  const [content, setContent] = useState({
    subject: "",
    topicName:"",
    topicDescription: "",
    videoLinkOne: "",
    videoLinkTwo: "",
    videoLinkThree: "",
    audioLink: "",
    error: "",
    success: false,
    loading: false,
  });

  const {subject, topicName, topicDescription, videoLinkOne, videoLinkTwo, videoLinkThree, audioLink, gradeList, error, success, loading} = content;

  const {user, token} = isAuthenticated();

  const onSubmit =  event => {
    event.preventDefault();
    setGetGrade([
      ...getGrade,
      
    ])
    setContent({...content, error:"", loading: true});

    // Backend request
    createContent(user._id, token, classRoom, {getGrade}, { subject, topicName, topicDescription, videoLinkOne, videoLinkTwo, videoLinkThree, audioLink, gradeList})
    .then(data => {
      if(data.error){
          setContent({...content, error: data.error})
          setGetGrade([...getGrade, {error: data.error}])
      }
      else{
        setContent({
            ...content,
            subject: "",
            topicName:"",
            topicDescription: "",
            videoLinkOne: "",
            videoLinkTwo: "",
            videoLinkThree: "",
            audioLink: "",
            loading: false,
            success: true,
        });
        setGetGrade([...getGrade, {loading: false, success: true}] )
        setOpen(false);

      }
    });
  };
  

  const handleUploadContent = name => event => {
    setContent({...content, error: false, [name]: event.target.value});
  }

  const successMessage = () => {
    if (success) {
      return (      
        <center> <p className="text-success my-auto" style={{fontFamily: "comic sans ms", fontSize: 16}}>Content Created Succesfully</p></center>
      )
    }
  };

  

  const classes = useStyles();

  return (
    <div>
      <Button className="float-right mt-2" style={{outline: "none"}} onClick={handleClickOpen}>
        <AddCircleRoundedIcon style={{fontSize: 45, color: "#0A3D62"}} />
      </Button>
      <Dialog onClose={handleClose} fullWidth="true"  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>Add Content</p>
        </DialogTitle>
        <Divider/>
        <DialogContent>

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

           <FormControl label="Grade"  variant="outlined"  style={{width: "100%"}} className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Add Grade</InputLabel>
              <Select className="mb-3 mt-3" 
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={getGrade}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value.id} label={value.grade} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {allgrade.map((grades) => (
                  <MenuItem value={grades} >
                    {grades.grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Topic Name" variant="outlined" onChange={handleUploadContent("topicName")} value={topicName} />
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Topic Description" variant="outlined" onChange={handleUploadContent("topicDescription")} value={topicDescription}/>
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Video Link 1" variant="outlined" onChange={handleUploadContent("videoLinkOne")} value={videoLinkOne} />
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Video Link 2" variant="outlined" onChange={handleUploadContent("videoLinkTwo")} value={videoLinkTwo}/>
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Video Link 3" variant="outlined" onChange={handleUploadContent("videoLinkThree")} value={videoLinkThree}/>
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="audio link" variant="outlined" onChange={handleUploadContent("audioLink")} value={audioLink}/>

          <div>
          <label for="files" class="btn"><Chip icon={<FileCopyRoundedIcon className="p-1" style={{color: "#ffffff", width: 30}}/>} style={{backgroundColor: "#00aeef"}} label="Document" /></label>
          <input id="Documents" position="relative" type="file" multiple />

          </div> 
           
          <div>
          <label for="files" class="btn"><Chip icon={<AttachFileRoundedIcon className="p-1" style={{color: "#ffffff"}}/>} style={{backgroundColor: "#00c853"}} label="Attachment" /></label>
          <input id="Attachments" position="relative" type="file" multiple />

          </div> 
          {successMessage()}
           <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}} onClick={onSubmit}>Create Content</button>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddPlanner;
