import React from 'react';
import { Card, Grid, Divider } from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { MDBIcon } from "mdbreact";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Chip from '@material-ui/core/Chip';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import InsertLinkRoundedIcon from '@material-ui/icons/InsertLinkRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import AddTeacher from "./AddTeacher";
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import FaceIcon from '@material-ui/icons/Face';
import PaymentIcon from '@material-ui/icons/Payment';


const Contents = () => {
  return (
    <div>
      <Card className="shadow d-block w-100 h-100 mt-3 mb-3" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
        <Grid container spacing="1">
          <Grid item xs={6} sm={6} md={6}>
            <div className="row p-3">
            <Chip className="ml-3 mt-2" style={{fontFamily: "comic sans ms", backgroundColor: '#ff3d00', color: '#ffffff'}} label="Teacher" icon={<FaceIcon style={{color: "#fbe9e7"}}/>} /> 
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={6} >
          <div className="p-3">
            <AddTeacher/>
          </div>
           
          </Grid>
        </Grid>
      </Card>

      <Card className="shadow d-block w-100 h-100" style={{ borderRadius: 12, backgroundColor: "#ffffff"}}>
      <Grid container spacing="1" className="mb-1" style={{backgroundColor: "#ffccbc"}}>
          <Grid item xs={9} sm={10} md={11}>
            <div className="input-group pl-3">
              <div className="input-group-prepend ">
                <span className="input-group-text mt-3 mb-3" style={{backgroundColor: "#0A3D62", borderColor: "#0A3D62"}} >
                  <MDBIcon style={{color: "#ffccbc"}} icon="search" />
                </span>
              </div>
              <input className="form-control my-0 py-1 mt-3 mb-3"  style={{backgroundColor: "#f5f5f5", borderColor: "#ff3d00"}} type="text" placeholder="Search.." aria-label="Search" />
            </div>
          </Grid>
          <Grid item xs={3} sm={2} md={1} >
            <div className="mt-3 ml-2 mb-1 mr-3">
              <FilterListRoundedIcon style={{fontSize: 40, color: "#424242"}} className="float-right"/>
            </div>
          </Grid>
        </Grid>
        <div className="pt-3 pl-3 pr-3">
          <Card className="shadow-sm d-block w-100 h-100" style={{ backgroundColor: "#eceff1"}}>
            <Grid container spacing="0">
              <Grid item xs={9} sm={10} md={11}>
                <p className="pt-3 pl-3" style={{fontSize: 20, fontWeight: "bold"}}>Anik Roy</p>
                <p className="pl-3" style={{fontSize: 17, fontWeight: "bold", fontFamily: "comic sans ms", color: "#039be5"}}>Institute: Haridar class</p>
              </Grid>
              <Grid item xs={3} sm={2} md={1}>
                <MoreVertRoundedIcon className="pt-4 pr-1 float-right" style={{color: "#424242", fontSize: 55}}/>
              </Grid>
            </Grid>
          </Card>
        </div>
        
        &nbsp;
      </Card>
    </div>
  )
}

export default Contents;
