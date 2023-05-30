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
import CityIcon from "../../assets/city.png";
import { createCity, getAllCity, removeCity } from '../helper/adminapicall';


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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const {user,token} = isAuthenticated();

  const [allcity, setAllCity] = useState([]);

  const cityLoad = (userId, token) => {
    getAllCity(userId, token).then(data => {
      if(data.error){
        console.log(data.error)
      }
      else{
        setAllCity(data)
      }
    });
  };

  const [city, setcity] = useState({
    cityName: "",
    lanmarks: "",
    error: "",
    loading: false,
    success: true,
  })

  const{cityName, error, lanmark, loading, success} = city;

  const onSubmit = event => {
    event.preventDefault();
    setcity({...city, error:"", loading: true});

    createCity(user._id, token, {cityName})
    .then(data => {
      if(data.error){
        setcity({...city, error: data.error})
      }
      else{
        setcity({
          ...city,
          cityName: "",
          loading: false,
          success: true
        })
        cityLoad(user._id, token);
      }
    })
  }

  const handleChange = name => event => {
    setcity({...city, error: false, [name]: event.target.value});
  }

  const successMessage = () => {
    if (success) {
      return (      
        <center> <p className="text-success my-auto" style={{fontFamily: "comic sans ms", fontSize: 16}}>City Succesfuly Added</p></center>
      )
    }
  };

  const deleteThisCity = (cityId)=> {
    removeCity(user._id, token, cityId).then(() => {
        setAllCity((city) => city.filter((c) => c._id !== cityId));
    });
  };

  
  const handlechipsDelete=deletecity=>()=>{
  
    deleteThisCity(deletecity._id);

  }


  return (
    <div>
      
      <Button className="mt-1" style={{outline: "none"}} onClick={handleClickOpen}>
        <img src={CityIcon} style={{width: 55, height: 55}}/>
      </Button>
      <Dialog onClose={handleClose} fullWidth="true" aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent>
        <div className="row" style={{justifyContent: 'space-between'}}>
          <TextField className="ml-2" style={{width: "70%"}} type="text" value={cityName} onChange={handleChange("cityName")} id="city" label="City Name" variant="outlined" />
          <button type="submit" onClick={onSubmit} className="nav-link shadow btn mr-2" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "20%"}}>Add</button>  
        </div>
        &nbsp;
        <Divider/>
        &nbsp;
        {allcity.map((cities, index) => {
            return (
              <Chip className="mr-2 mt-3 mb-2" style={{fontFamily: "comic sans ms", backgroundColor: '#03a9f4', color: '#ffffff'}} label={cities.cityName} onDelete={handlechipsDelete(cities)}/> 
            )
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCity;