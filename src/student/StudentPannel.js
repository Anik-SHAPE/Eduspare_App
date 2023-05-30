import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import "../styles.css";
import { Fab, Grid, Card, Paper, Divider } from '@material-ui/core';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { Link } from 'react-router-dom';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import BillingLogo from '../assets/billing.png';
import CalendarLogo from '../assets/calender.png';
import HomeworkLogo from '../assets/homework.png';
import AssesMentLogo from '../assets/assesment.png';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BellIcon from "../assets/bellicon.png";
import ExamIcon from '../assets/exam.png';
import AttendIcon from "../assets/attend.png";
import HorizontalScroll from 'react-scroll-horizontal';
import CardStyle from './CalenderDashboad/CalenderCards';
import { getUser } from '../core/helper/UserApiCall';
import { isAuthenticated } from '../auth';


const style = {
  margin: 0,
  top: 'auto',
  right: '43%',
  bottom: 15,
  left: 'auto',
  position: 'fixed',
  backgroundColor: "#1b5e20"
};

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }
});


export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const child = { width: `300em`, height: `100%`}

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
  
  useEffect(() => {
    userload(user._id, token);
  }, []);

  return (
    
    <div>
      <div className="row mt-2 hidedesktop" style={{justifyContent: "space-between"}}>
   
        <div className="row pl-4 pt-2">
          <AccountCircleIcon className="pl-2" style={{width: 60, height: 60}}/>
          <div>
            <p style={{fontWeight: "bold", fontSize: 16}} className="my-auto pt-2 pl-2">Sir,
            {/* {selectedValue} */}
            <p  style={{fontWeight: "normal", fontSize: 15}}> ( Chemistry )</p></p>
          </div>
        </div>

        <Card className="d-block mt-3 mr-3" style={{backgroundColor:"#039be5", borderRadius: 20, width: 40, height: 40}} 
        // onClick={handleClickOpen}
        >
          <center><ArrowDropDownIcon  style={{ color:"#ffffff", width: 40, height: 40}}/></center>
        </Card>

          
      </div>

      <div className="mt-4 hideonmobile">
        <CardStyle/>
      </div>

      <div  className="hidedesktop">
        
        <Divider/>

        <CardStyle/>
      
        <Grid container spacing="1">

          <Grid item xs={4} sm={6} md={4} >
            <Link to={`/student/calender`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}}>
                <center>
                  <img className="mt-3" src={CalendarLogo} width="50px" height="50px"/>
                  <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Calendar</p>
                </center>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4} sm={6} md={4} >
            <Link to={`/student/homework`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <center>
                  <img className="mt-3" src={HomeworkLogo} width="50px" height="50px"/>
                  <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Home work</p>
                </center>
              </Card>
            </Link>
          </Grid>
          
          <Grid item xs={4} sm={6} md={4}>
            <Link to={`/student/assesment`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <center>
                  <img className="mt-3" src={AssesMentLogo} width="50px" height="50px"/>
                  <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Assesment</p>
                </center>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4} sm={6} md={4}  className="mb-5">
            <Link to={`/student/exam`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <center>
                  <img className="mt-3" src={ExamIcon} width="50px" height="50px"/>
                  <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Exam</p>
                </center>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4} sm={6} md={4}  className="mb-5">
            <Link to={`/student/attendance`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <center>
                  <img className="mt-3" src={AttendIcon} width="50px" height="50px"/>
                  <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Attendence</p>
                </center>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={4} sm={6} md={4}  className="mb-5">
            <Link to={`/student/billing`} style={{textDecoration: "none"}}>
              <Card className="d-block w-100" style={{ borderRadius: 10, backgroundColor: "#ffffff"}} >
                <center>
                  <img className="mt-3" src={BillingLogo} width="50px" height="50px"/>
                  <p className="pt-2" style={{fontFamily: "comic sans ms", fontSize: 15, fontWeight: "bold"}}>Billing</p>
                </center>
              </Card>
            </Link>
          </Grid>
          
        </Grid>
        </div>
        
       
        {/* </Card> */}
    </div>
    
  );
}
