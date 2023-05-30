import { Button, Card, Divider, Grid, Link } from '@material-ui/core';
import React from 'react';
import BillingIcon from '../../assets/billing.png';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { divide } from 'lodash';
import "../../styles.css";
import ChemLogo from "../../assets/chem.jpg";
import BioLogo from "../../assets/bio.jpg";
import PhyLogo from "../../assets/phy.jpg";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {

    },
    content: {
      
    },
    cover: {
      width: 200,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

export default function ManageBilling() {

    const [student, setStudent] = React.useState('');

    const handleChange = (event) => {
        setStudent(event.target.value);
    };

    const [paymentStatus, setPaymentStatus] = React.useState('Pending');

    const handlePayment = (event) => {
        setPaymentStatus(event.target.value);
    }

    const classes = useStyles();

    return (
        <div>
            <div className="hidedesktop fixed-top d-block w-100" style={{height: 70}}>
            <Grid container spacing="1" className="mb-1">
                <Grid item xs={2} sm={6} md={6}>
                    <Link to={`/teacher/dashboard`} style={{textDecoration:"none"}}>
                    <ArrowBackRoundedIcon className="ml-2 mt-3 pt-2" style={{color: "#000000", width: 30, height: 30}}/>
                </Link>
                </Grid>
                <Grid item xs={8} sm={6} md={6}>
                    <div className="mt-3 row">
                        <img src={BillingIcon} style={{width: 40, height: 40}}/>
                        <p className="pt-2 pl-2 pb-1" style={{color: "#000000", fontSize: 18}}>Billing</p>  
                    </div>
                </Grid>
                <Grid item xs={2} sm={6} md={6}>
                    <MoreVertRoundedIcon className="mt-3 pt-1" style={{color: "#424242", fontSize: 30}}/>
                </Grid>
            </Grid>
            </div>


            &nbsp;
            <div className="ml-1 mr-2  row hideonmobile" style={{justifyContent: "space-between"}}>
                <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#0091ea"}}><p className="my-auto p-1" style={{fontSize: 25, color: "#ffffff"}}>Batch Name</p></Card>
                <Card className="pl-4 pr-4 shadow" style={{borderRadius: 15, backgroundColor: "#ffffff"}}>
                <div className="row">
                    <Card className="shadow-sm my-auto mr-2" style={{ borderRadius: 100, width: 30, height: 30}} >
                    <img className="d-block w-100 h-100 img-fluid" src={BillingIcon}/>
                    </Card>
                    <p className="my-auto p-1" style={{fontWeight: "bold", fontSize: 25, color: "#000000"}}>Billing</p>
                </div>
                </Card>
            </div>

            <div className="hidedesktop">
            <center>
                <Card className="pl-4 pr-4" style={{borderRadius: 15, backgroundColor: "#0091ea"}}>
                    <p className="my-auto p-1" style={{fontSize: 18, color: "#ffffff"}}>Batch Name</p>
                </Card>
            </center>
            </div>
            &nbsp;
            <Divider/>
            &nbsp;
            <div className="hideonmobile">

                <Grid container spacing="1">
                    <Grid item xs={12} sm={6} md={6} className="row">
                      
                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 1</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 2</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 3</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 3</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 3</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 3</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 3</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="mr-2 mt-2 shadow-sm" style={{backgroundColor:"#ffffff", whiteSpace: "normal", width: 160, height:120}}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <p style={{color: "#00c853"}}>Package topic name 3</p>
                                    <p>Duration: 2 Month
                                    <p>Amount: Rs. 2,000</p></p>
                                </CardContent>
                            </div>
                        </Card>

                        <Button className="my-auto ml-5" style={{whiteSpace: "normal", width: 30, height:40, borderRadius: 100, outline: "none"}}>
                                <AddCircleRoundedIcon className="w-100 h-100" style={{color: "#0091ea"}}/>
                        </Button>

                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className="row">
                        <Card className="mt-2 shadow w-100" style={{backgroundColor:"#ffffff"}}>
                            <div className="m-2 row" style={{justifyContent: "space-between"}}>
                                <div className="mt-3 ml-2">
                                    <p style={{fontWeight: "bold"}}>Student Name
                                    <p>student@gmail.com</p></p>
                                </div>
                                <FormControl variant="filled" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={student}
                                    onChange={handleChange}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Divider/>
                            &nbsp;
                            <div className="m-3 row" style={{justifyContent: "space-between"}}>
                                
                
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Payment Status : </FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1" value={paymentStatus} onChange={handlePayment}>
                                            <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                            <FormControlLabel value="Half Paid" control={<Radio />} label="Half Paid" />
                                            <FormControlLabel value="Complete" control={<Radio />} label="Complete" />
                                        </RadioGroup>
                                </FormControl>

                                <div>
                                    <p style={{fontWeight: "bold", fontSize: 18}}>Institute Name</p>
                                    <p>Validity: jan 21 to feb 21 
                                    <p>Package Name</p></p>
                                </div>

                            </div>
                            <div className="row ml-3 mr-3" style={{justifyContent: "space-between"}}>
                                <Fab variant="extended" size="medium" color="primary" aria-label="add" className={classes.margin} style={{backgroundColor: "#00c853"}}>
                                    Request Payment
                                </Fab>
                                <Fab variant="extended" size="medium" color="primary" aria-label="add" className={classes.margin} style={{backgroundColor: "#0091ea"}}>
                                    View
                                </Fab>
                            </div>
              
                        </Card>
                    </Grid>
                </Grid>

            </div>
                
        

            <div className="wrapper hidedesktop mb-3">

                <div className="pr-2 mb-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", borderRadius: 8, backgroundColor:"#ffffff", whiteSpace: "normal", width: 135, height:120}}>
                        <div className="m-2 pt-1">
                            <p style={{color: "#00c853"}}>Package topic name 1</p>
                            <p>Duration: 2 Month
                            <p>Time: Rs. 2,000</p></p>
                        </div>
                    </Card>
                </div>

                <div className="pr-2 mb-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", borderRadius: 8, backgroundColor:"#ffffff", whiteSpace: "normal", width: 135, height:120}}>
                        <div className="m-2 pt-1">
                            <p style={{color: "#00c853"}}>Package topic name 1</p>
                            <p>Duration: 2 Month
                            <p>Time: Rs. 2,000</p></p>
                        </div>
                    </Card>
                </div>
                <div className="pr-2 mb-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", borderRadius: 8, backgroundColor:"#ffffff", whiteSpace: "normal", width: 135, height:120}}>
                        <div className="m-2 pt-1">
                            <p style={{color: "#00c853"}}>Package topic name 1</p>
                            <p>Duration: 2 Month
                            <p>Time: Rs. 2,000</p></p>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    )
}
