import * as React from 'react';
import {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Calender from "../../assets/calender.png";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import {ViewState} from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Room from '@material-ui/icons/Room';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getAllBatch, getAllEventByScheduler,getAllEventsFromBatchs, getEvent } from '../../teacher/helper/teacherapicall';
import { isAuthenticated } from '../../auth';
import { getUser } from '../../core/helper/UserApiCall';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import CreateIcon from '@material-ui/icons/Create';
// const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';

// const makeQueryString = (currentDate, currentViewName) => {
//   const format = 'YYYY-MM-DDTHH:mm:ss';
//   const start = moment(currentDate).startOf(currentViewName.toLowerCase());
//   const end = start.clone().endOf(currentViewName.toLowerCase());
//   return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
// };

const styles = {
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
};

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);



// const mapAppointmentData = appointment => ({
//   ...appointment,
//   startDate: appointment.StartDate,
//   endDate: appointment.EndDate,
//   title: appointment.Text,
// });

const useStyles = makeStyles({
    avatar: {
        backgroundColor: "#2962ff",
        color: "#42a5f5",
    },
});


const BatchCalenderView=()=>{

  // const  schedulerData=[
  //   {startDate: '2020-11-01T09:45', endDate: '2020-11-01T11:00', title: 'Meeting'},
  //   {startDate: '2020-11-01T12:00', endDate: '2020-11-02T13:30', title: 'Go to a gym'},
  // ]
  
  const calenderDate=[];
  const [cDate,setcDate]=React.useState([]); 
  const classes = useStyles();

  const handleListItemClick = batch=>()=> {
    
    setBatch({
      ...Batch,
      BatchId:batch._id,
      batchname:batch.batchname,
      scheduler:batch.scheduler
    });

    getAllEventByScheduler(user._id, token, batch.scheduler).then(d => {
      if(d.error){
        console.log("err in db");
      }
      else{

        if(calenderDate.length!=0){
          for(var k=0;k<calenderDate.length;k++){
            calenderDate.pop();
          }
        }
        setcDate([]);
        for(var i=0;i<d.length;i++){
          calenderDate.push({startDate:d[i].date+"T"+d[i].start_time,endDate:d[i].date+"T"+d[i].end_time,title:d[i].title,contentId:d[i].contentId,eventId:d[i]._id,batchId:d[i].BatchId});
        }
        setcDate(calenderDate);
      }
    })

    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const [myuser, setUser] = useState({
    error: "",
    classRoom: ""
  })
  
  const {classRoom} = myuser;
  const {user,token} = isAuthenticated();
  
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

  const [Batchs, setBatchs] = useState([]);
  const [Batch,setBatch]=useState({
    BatchId: "",
    batchname:"",
    scheduler:"",
  });
  const {BatchId, batchname, scheduler}=Batch;
  const [Events,setEvents]=React.useState([]);
  const batchIdList=[];
  
  const BatchLoad = () => {
    getAllBatch(user._id, token, user.classRoom).then(data => {
      if(data.error){
        console.log("error");
      }
      else{
        if(batchIdList.length!=0){
          for(var n=0;n<batchIdList.length;n++){
            batchIdList.pop()
          }
        }
        for(var g=0;g<data.length;g++){
          batchIdList.push(data[g]._id);
        }
        setBatchs(data);
        setBatch({
          ...Batch,
          batchname:"All Batches"

        });


        
   
    getAllEventsFromBatchs(user._id, token, {batchIdList}).then(d => {
      if(d.error){
        console.log("err in db");
      }
      else{
       //console.log(d);
        if(calenderDate.length!=0){
          for(var k=0;k<calenderDate.length;k++){
            calenderDate.pop();
          }
        }
        
        setcDate([]);
        for(var i=0;i<d.length;i++){
          calenderDate.push({startDate:d[i].date+"T"+d[i].start_time,endDate:d[i].date+"T"+d[i].end_time,title:d[i].title,contentId:d[i].contentId,eventId:d[i]._id,batchId:d[i].BatchId});
        }
        setcDate(calenderDate);
      }
    })}});
  }

  
  useEffect(() => {
    userload(user._id, token);
    BatchLoad();
  }, []);

  // const Header = ({appointmentData, classes, ...restProps}) => {
  //   return(
  //     <AppointmentTooltip.Header appointmentData={cDate}
  //   >
  //     <Button color="secondary" style={{outline: "none"}}
  //       /* eslint-disable-next-line no-alert */
  //       onClick={() => <Link to={`/teacher/calender/event/${eventId}`}/>}
  //       className={classes.commandButton}
  //     >
  //       <p style={{fontSize: 20}}>View</p>
  //     </Button>
  //   </AppointmentTooltip.Header>
  //   )
  // }

  class Demo extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        currentViewName: 'Month',
      };
      // this.loadData = this.loadData.bind(this);
      this.currentViewNameChange = (currentViewName) => {
        this.setState({ currentViewName, loading: true });
      };
      this.currentDateChange = (currentDate) => {
        this.setState({ currentDate, loading: true });
     };
    }
    
    // componentDidMount() {
    //   this.loadData();
    // }
  
    // componentDidUpdate() {
    //   this.loadData();
    // }
  
    // loadData() {
    //   const { currentDate, currentViewName } = this.state;
    //   const queryString = makeQueryString(currentDate, currentViewName);
    //   if (queryString === this.lastQuery) {
    //     this.setState({ loading: false });
    //     return;
    //   }
    //   fetch(queryString)
    //     .then(response => response.json())
    //     .then(({ data }) => {
    //       setTimeout(() => {
    //         this.setState({
    //           data,
    //           loading: false,
    //         });
    //       }, 600);
    //     })
    //     .catch(() => this.setState({ loading: false }));
    //   this.lastQuery = queryString;
    // }






    
    render() {

      const {
        // data, loading,
        currentDate, currentViewName,
      } = this.state;
  
      // const formattedData = data
      //   ? data.map(mapAppointmentData) : [];

      const BatchSelection = () => {

    
  
        return (
          <div>
            <div>
              <Typography className="pb-2" variant="subtitle1">Selected: {batchname}</Typography>
              <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                  Select Batch
              </Button>
            
            </div>
            <div>
              <Dialog onClose={handleClose} aria-labelledby="Add Batch" open={open}>
              <DialogTitle id="simple-dialog-title">Select Batch</DialogTitle>
              <List>
                  
              <ListItem button onClick={()=>{
                BatchLoad();
                setOpen(false);
              }}>
                <ListItemAvatar>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="All Batches" />
              </ListItem>
    
                {Batchs.map((batches) => (
                <ListItem button onClick={handleListItemClick(batches)} key={batches._id}>
                    <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={batches.batchname} />
                </ListItem>
                ))}
        
                <ListItem autoFocus button onClick={() => handleListItemClick('Select Batch')}>
                </ListItem>
              </List>
              </Dialog>
            </div>
    
            
          </div>
            
        );
      }


      return (
       
        <div>
      <BatchSelection/>
      <div>
        <Paper className="mt-3">
          <Scheduler
            data={cDate}
            height={670}
          >
            <ViewState
              currentDate={currentDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
              onCurrentDateChange={this.currentDateChange}
            />
            <MonthView
              startDayHour={9}
              endDayHour={18}
            />
            {/* <WeekView
              startDayHour={9}
              endDayHour={18}
            />
            <DayView
              startDayHour={9}
              endDayHour={18}
            /> */}

            <Appointments />
            <Toolbar
              // {...loading ? { rootComponent: ToolbarWithLoading } : null}
            />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <AppointmentTooltip showCloseButton/>

          </Scheduler>
        </Paper>
        </div>
        </div>
     
      );
    }
  }

 

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
              <img src={Calender} style={{width: 40, height: 40}}/>
              <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Calender</p>  
          </div>
        </Grid>
        <Grid item xs={2} sm={6} md={6}>
          <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
        </Grid>
      </Grid>

    </div>

    
    <Demo/>
  </div>
  
  )
}

export default BatchCalenderView;