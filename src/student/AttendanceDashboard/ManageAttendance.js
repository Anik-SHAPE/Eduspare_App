import { Card, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import { CheckBox } from 'devextreme-react';
import React, {useState, useEffect} from 'react';
import SubjetLogo from '../../assets/content.png';

const ManageAttendance = () => {
    return(
        <div>
            <Grid container spacing="1" className="mt-1">
                <Grid xs={12} sm={12} md={9} className="pr-4">
                    <Card className="shadow-sm ml-2 mr-2 m-1" style={{ backgroundColor: "#eceff1"}}>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Corona Virus</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#00c853"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="P"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Gravity</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#ff1744"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="A"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Cosmos</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#ff1744"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="A"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Alpha Centuri</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#ff1744"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="A"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Black Hole</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#00c853"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="p"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Rajputh's war</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#ff1744"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="A"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Water Cycle</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#00c853"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="p"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Reproduction</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#ff1744"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="A"
                        />
                        </FormGroup>
                        </div>
                        <div className="row pr-2" style={{justifyContent: "space-between"}}>
                          <div className="row ml-4 pl-2 pt-2 pb-2">
                          <Card className="shadow my-auto" style={{ borderRadius: 100, width: 30, height: 30}} >
                              <img className="d-block w-100 h-100 img-fluid" src={SubjetLogo}/>
                          </Card>
                          <p className="pl-2 my-auto" style={{fontSize: 18}}>Chemical Bonding</p>
                        </div>
                        <FormGroup row className="pt-2 pr-2">

                        <FormControlLabel style={{color: "#00c853"}}
                            control={
                            <CheckBox
                                name="checkedB"
                                style={{color: "#00c853"}}
                            />
                            }
                            label="p"
                        />
                        </FormGroup>
                        </div>
                    </Card>
                    
                </Grid>
                <Grid xs={12} sm={12} md={3}>
                    <Card className="mt-1 mr-2" style={{borderRadius: 5, backgroundColor: "#00c853"}}>
                        <center>
                            <p className="pt-3" style={{fontSize: 18}}>Class Attended</p>
                            <p style={{fontWeight: "bold", fontSize: 40}}>4/8</p>
                        </center>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default ManageAttendance;