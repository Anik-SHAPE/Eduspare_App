import React, { Component }  from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Chip } from '@material-ui/core';
import {SignIn, authenticate, isAuthenticated} from "../../auth/index";
import {Redirect} from "react-router-dom";
import useState from "react-hook-use-state";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { createSubject, deleteSubject, getAllSubject } from '../helper/adminapicall';
import SubjectIcon from "../../assets/subject.png";
import { API } from "../../backend";
import Avatar from '@material-ui/core/Avatar';

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
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
  },
}));

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

const AddCity = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    subjectLoad(user._id,token);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const {user,token} = isAuthenticated();

  const [allsubject, setAllSubject] = useState([]);

  const subjectLoad = (userId, token) => {
    getAllSubject(userId, token).then(data => {
        if(data.error){
            console.log(data.error);
        }else{
            setAllSubject(data);
        }
    });
  };

  const [subjects, setsubjects] = useState({
    subject_name: "",
    subject_photo: "",
    error: "",
    loading: false,
    success: true,
    formData: new FormData()
  })

  const{subject_name, subject_photo, error, loading, success, formData} = subjects;

  const onSubmit = event => {
    event.preventDefault();
    setsubjects({...subjects, error:"", loading: true});

    createSubject(user._id, token, formData)
    .then(data => {
      if(data.error){
        setsubjects({...subjects, error: data.error})
      }
      else{
        setsubjects({
          ...subjects,
          subject_name: "",
          subject_photo: "",
          loading: false,
          success: true
        })
        subjectLoad(user._id, token);
      }
    })
  }

  const handleChange = name => event => {
    const value = name === "subject_photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setsubjects({ ...subjects, [name]: value });
  };

  const successMessage = () => {
    if (success) {
      return (      
        <center> <p className="text-success my-auto" style={{fontFamily: "comic sans ms", fontSize: 16}}>Subject Succesfuly Added</p></center>
      )
    }
  };

  const deleteThisSubject = (subjectId)=> {
    deleteSubject(user._id, token, subjectId).then(() => {
        setAllSubject((subject) => subject.filter((s) => s._id !== subjectId));
    });
  };

  
  const handlechipsDelete=deletesubject=>()=>{
  
    deleteThisSubject(deletesubject._id);

  }


  return (
    <div>
      <Button className="mt-1" style={{outline: "none"}} onClick={handleClickOpen}>
        <img src={SubjectIcon} style={{width: 55, height: 55}}/>
      </Button>
      <Dialog onClose={handleClose} fullWidth="true" aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField style={{width: "100%"}} type="text" value={subject_name} onChange={handleChange("subject_name")} id="Subject Name" label="Subject Name" variant="outlined" />
          <h6 className="text-success pt-3">Upload Image</h6>
          <input onChange={handleChange("subject_photo")} type="file" name="subject_photo" accept="image" />
          <button type="submit" onClick={onSubmit} className="nav-link mt-4 mb-4 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}}>Save</button>  
        </form>
        <Divider/>
        &nbsp;
        {allsubject.map((subject, index) => {
            return (
              <Chip icon={<Avatar alt="picture" style={{width: 20, height: 20}} src={`${API}/subject-url/photo/${subject._id}`} />} className="mr-2 mt-3 mb-2" style={{fontFamily: "comic sans ms", backgroundColor: '#03a9f4', color: '#ffffff'}} label={subject.subject_name} onDelete={handlechipsDelete(subject)}/> 
            )
          })}

        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCity;