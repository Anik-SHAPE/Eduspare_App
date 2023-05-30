import React, { Component, useEffect, useState }  from 'react';
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
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { createGrade, getAllGrade, deleteGrade} from '../helper/adminapicall';
import {getUser} from "../../core/helper/UserApiCall";
import GradeIcon from "../../assets/grade.png";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

const AddGrade = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    gradeLoad(user._id, token);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const {user,token} = isAuthenticated();

  const [allgrade, setAllGrade] = useState([]);

  const gradeLoad = (userId, token) => {
    getAllGrade(userId, token).then(data => {
        if(data.error){
            console.log(data.error);
        }else{
            setAllGrade(data);
        }
    });
  };

  const [grades, setgrade] = useState({
    grade: "",
    error: "",
    loading: false,
    success: true,
  })

  const{grade, error, loading, success} = grades;

  const onSubmit = event => {
    event.preventDefault();
    setgrade({...grades, error:"", loading: true});

    createGrade(user._id, token, {grade})
    .then(data => {
      if(data.error){
        setgrade({...grades, error: data.error})
      }
      else{
        setgrade({
          ...grades,
          grade: "",
          loading: false,
          success: true
        }); 
        gradeLoad(user._id, token);
      }

    })
  }

  const handleChange = name => event => {
    setgrade({...grades, error: false, [name]: event.target.value});
  }

  const successMessage = () => {
    if (success) {
      return (      
        <center> <p className="text-success my-auto" style={{fontFamily: "comic sans ms", fontSize: 16}}>Grade Succesfuly Added</p></center>
      )
    }
  };

  const deleteThisGrade = (gradeId)=> {
    deleteGrade(user._id, token, gradeId).then(() => {
        setAllGrade((grade) => grade.filter((g) => g._id !== gradeId));
    });
  };

  
  const handlechipsDelete=deletegrade=>()=>{
  
    deleteThisGrade(deletegrade._id);

  }


  return (
    <div>
      <Button style={{outline: "none"}} onClick={handleClickOpen}>
        <img src={GradeIcon} style={{width: 55, height: 55}}/>
      </Button>
      <Dialog onClose={handleClose} fullWidth="true" aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent>
          <div className="row" style={{justifyContent: 'space-between'}}>
            <TextField className="ml-2" style={{width: "70%"}} type="text" value={grade} onChange={handleChange("grade")} id="city" label="Grade" variant="outlined" />
            <button type="submit" onClick={onSubmit} className="nav-link shadow btn mr-2" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "20%"}}>Add</button>  
          </div>
          &nbsp;
          <Divider/>
          &nbsp;
          {allgrade.map((grades, index) => {
            return (
              <Chip className="mr-2 mt-3 mb-2" style={{fontFamily: "comic sans ms", backgroundColor: '#03a9f4', color: '#ffffff'}} label={grades.grade} onDelete={handlechipsDelete(grades)}/> 
            )
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddGrade;