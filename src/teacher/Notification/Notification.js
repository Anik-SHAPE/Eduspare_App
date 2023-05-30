import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BellIcon from "../../assets/bellicon.png";
import { Card, Divider } from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AddAlertRoundedIcon from '@material-ui/icons/AddAlertRounded';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const Notification = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        
        <Card aria-describedby={id} className="shadow" onClick={handleClick} style={{backgroundColor: "#ffffff", width: 40, height: 40, borderRadius: 100}}>
            <img className="d-block w-100 h-100 img-fluid" src={BellIcon}/>
        </Card>
     
        <Popover className="mt-2"
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
        >
        <div className="ml-4 pl-1 mr-3 row" style={{justifyContent: "space-between"}}>
            <p className="pt-2 pb-2" style={{fontSize: 18, fontWeight: "bold", color: "#00c853"}}>Notification's</p>
            <AddAlertRoundedIcon className="pt-2 pb-2" style={{color: "#d50000", width: 39, height: 39}}/>
        </div>
        
        <div style={{width: 300, borderRadius: 40}} className="pl-3 pr-3">
            <div className="m-2 row">
                <NotificationsActiveIcon className="d-block img-fluid my-auto p-1" style={{width: 30, height: 30, color: "#039be5"}}/>
                <p className="my-auto p-1" style={{color: "#000000"}}>Notification Alert 1</p>
            </div>
            <Divider/>
            <div className="m-2 row">
                <NotificationsActiveIcon className="d-block img-fluid my-auto p-1" style={{width: 30, height: 30, color: "#039be5"}}/>
                <p className="my-auto p-1" style={{color: "#000000"}}>Notification Alert 2</p>
            </div>
        </div>
      </Popover>
    </div>
  );
}

export default Notification;



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';
// import BellIcon from "../../assets/bellicon.png";
// import { Card } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: 'relative',
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }));

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// export default function FullScreenDialog() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Card className="shadow ml-4" onClick={handleClickOpen} style={{backgroundColor: "#ffffff", width: 40, height: 40, borderRadius: 100}}>
//         <img className="d-block w-100 h-100 img-fluid" src={BellIcon}/>
//       </Card>
//       <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
//         <AppBar className={classes.appBar} style={{backgroundColor: "#fb8c00"}}>
//           <Toolbar>
//             <IconButton onClick={handleClose} aria-label="close" style={{color: "#000000", outline: "none"}}>
//               <CloseIcon />
//             </IconButton>
//             <Typography variant="h6" style={{color: "#000000"}}>
//               Notification's
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <List>
         
//         </List>
//       </Dialog>
//     </div>
//   );
// }

