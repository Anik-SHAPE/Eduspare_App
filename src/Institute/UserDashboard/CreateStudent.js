import React from 'react';
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

const AddBatch = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Button className="float-right mb-3" style={{outline: "none"}} onClick={handleClickOpen}>
      <Chip  style={{fontFamily: "comic sans ms", backgroundColor: '#03a9f4', color: '#ffffff'}} label="Add"/> 
      </Button>
      <Dialog onClose={handleClose}  fullWidth="true"  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <p style={{fontFamily:"comic sans ms", fontSize: 25, fontWeight: "bold", color: "#00aeef" }}>Add Student</p>
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Student Name" variant="outlined" />
           <div className="form-group pt-2">
                <select className="form-control" placeholder="Category">
                    <option>Select Batch</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                </select>
           </div>
           <div className="form-group pt-2">
                <select className="form-control" placeholder="Category">
                    <option>Select Timing</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                </select>
           </div>
           <div className="form-group">
                <select className="form-control" placeholder="Category">
                    <option>Asign Grade</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    <option>Option 4</option>
                </select>
           </div>
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Email" variant="outlined" />  
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Phone Number" variant="outlined" />
           <TextField className="mb-3" style={{width: "100%"}} type="text" id="text" label="Location" variant="outlined" />
           
           <button type="submit" className="nav-link mt-3 mb-2 mr-2 shadow btn" style={{borderRadius: 20, backgroundColor: "#00c853", color: "#ffffff", width: "100%"}}>Create</button>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddBatch;
        
