import { Card, Grid } from '@material-ui/core';
import { divide } from 'lodash';
import React from 'react';
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
  }));

export default function CardStyle() {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>

            <div className="hideonmobile mr-3 wrapper">

                <div className="pr-2 m-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", backgroundColor:"#ffffff", whiteSpace: "normal", width: 400, height:160}}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <p style={{color: "#00c853"}}>General Principles and Process of Isolation of Elements</p>
                                <p>Subject: Chemistry
                                <p>Batch: Class II</p></p>
                            
                                
                                <div className="row pl-3" >
                                    <p style={{fontWeight: "bold"}}>10:00-11:30 AM</p>
                                    <p style={{fontWeight: "bold"}} className="pl-3">17 DEC</p>
                                </div>
                            </CardContent>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={ChemLogo}
                            title="Live from space album cover"
                        />
                    </Card>
                </div>

              <div className="pr-2 m-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", backgroundColor:"#ffffff", whiteSpace: "normal", width: 400, height:160}}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <p style={{color: "#00c853"}}>General Principles and Process of Isolation of Elements</p>
                                <p>Subject: Physics
                                <p>Batch: Class II</p></p>
                            
                                
                                <div className="row pl-3" >
                                    <p style={{fontWeight: "bold"}}>10:00-11:30 AM</p>
                                    <p style={{fontWeight: "bold"}} className="pl-3">17 DEC</p>
                                </div>
                            </CardContent>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={PhyLogo}
                            title="Live from space album cover"
                        />
                    </Card>
                </div>

                <div className="pr-2 m-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", backgroundColor:"#ffffff", whiteSpace: "normal", width: 400, height:160}}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <p style={{color: "#00c853"}}>General Principles and Process of Isolation of Elements</p>
                                <p>Subject: Biology
                                <p>Batch: Class II</p></p>
                            
                                
                                <div className="row pl-3" >
                                    <p style={{fontWeight: "bold"}}>10:00-11:30 AM</p>
                                    <p style={{fontWeight: "bold"}} className="pl-3">17 DEC</p>
                                </div>
                            </CardContent>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={BioLogo}
                            title="Live from space album cover"
                        />
                    </Card>
                </div>
            </div>

            <div className="wrapper hidedesktop mb-3">

                <div className="pr-2 mb-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", borderRadius: 8, backgroundColor:"#ffffff", whiteSpace: "normal", width: 280, height:135}}>
                        <CardMedia className={classes.cover} style={{backgroundColor: "#329c08", width: 120}}>
                            <center>
                                <Card className="shadow mt-2" style={{ borderRadius: 100, backgroundColor: "#329c08", width: 55, height: 55}} >
                                    <img className="d-block w-100 h-100 img-fluid" src={ChemLogo}/>
                                </Card>
                               
                                <p className="pt-2" style={{fontWeight: "bold", fontSize: 24, color: "#ffffff"}}>12
                                <p style={{fontSize: 15, color: "#ffffff"}}>DEC</p></p>
                            </center>
                        </CardMedia>
                
                        <div className="m-2 pt-1">
                            <p style={{color: "#039be5"}}>General Principles & Process of Isolation of Elements</p>
                            <p>Subject: Biology</p>
                            <p>Class II (10:-00 - 11:30 AM)</p>
                            
                        </div>

                    </Card>
                </div>

                <div className="pr-2 mb-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", borderRadius: 8, backgroundColor:"#ffffff", whiteSpace: "normal", width: 280, height:135}}>
                        <CardMedia className={classes.cover} style={{backgroundColor: "#329c08", width: 120}}>
                            <center>
                                <Card className="shadow mt-2" style={{ borderRadius: 100, backgroundColor: "#329c08", width: 55, height: 55}} >
                                    <img className="d-block w-100 h-100 img-fluid" src={PhyLogo}/>
                                </Card>
                               
                                <p className="pt-2" style={{fontWeight: "bold", fontSize: 24, color: "#ffffff"}}>32
                                <p style={{fontSize: 15, color: "#ffffff"}}>DEC</p></p>
                            </center>
                        </CardMedia>
                
                        <div className="m-2 pt-1">
                            <p style={{color: "#00c853"}}>General Principles & Process of Isolation of Elements</p>
                            <p>Subject: Biology</p>
                            <p>Class II (10:-00 - 11:30 AM)</p>
                            
                        </div>

                    </Card>
                </div>

                <div className="pr-2 mb-1" style={{display: "inline-block"}}>
                    <Card className={classes.root} style={{flexDirection: "row", borderRadius: 8, backgroundColor:"#ffffff", whiteSpace: "normal", width: 280, height:135}}>
                        <CardMedia className={classes.cover} style={{backgroundColor: "#329c08", width: 120}}>
                            <center>
                                <Card className="shadow mt-2" style={{ borderRadius: 100, backgroundColor: "#329c08", width: 55, height: 55}} >
                                    <img className="d-block w-100 h-100 img-fluid" src={ChemLogo}/>
                                </Card>
                               
                                <p className="pt-2" style={{fontWeight: "bold", fontSize: 24, color: "#ffffff"}}>12
                                <p style={{fontSize: 15, color: "#ffffff"}}>DEC</p></p>
                            </center>
                        </CardMedia>
                
                        <div className="m-2 pt-1">
                            <p style={{color: "#00c853"}}>General Principles & Process of Isolation of Elements</p>
                            <p>Subject: Biology</p>
                            <p>Class II (10:-00 - 11:30 AM)</p>
                            
                        </div>

                    </Card>
                </div>
                
            </div>

            
          
        </div>
    )
}
