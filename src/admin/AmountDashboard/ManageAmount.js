import React, { useEffect } from 'react';
import Chart from "chart.js";
import { Grid } from '@material-ui/core';

export default function ManageAmount() {

    let jan = "70000";
    let feb = "10000";
    let mar = "40000";
    let apr = "90000";
    let may = "20000";
    let jun = "90000";
    let jul = "50000";
    let aug = "70000";
    let sep = "30000";
    let oct = "60000";
    let nov = "80000";
    let dec = "100000";


    useEffect(() => {
        const ctx = document.getElementById("myChart");
        new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
            {
                label: "Monthly Earnings",
                data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
                backgroundColor: [
                    '#b9f6ca'
                ],
                borderColor: ["#f8bbd0", "#64b5f6", "#64b5f6", "#69f0ae", "#ffb74d", "#ff8a65", "#4db6ac", "#ce93d8", "#8c9eff", "#80deea", "#dce775", "#bdbdbd"],
                borderWidth: 2
            }
            ]
        }
        });
    })
    return (
        <div>
            <Grid container spacing="2">
                <Grid item xs={12} sm={12} md={9} >
                    <canvas id="myChart"/>
                </Grid>
                <Grid item xs={12} sm={12} md={3} >
                    <p className="text-center mt-4" style={{fontFamily: "comic sans ms", fontSize: 25, fontWeight: "bold", color: "#03a9f4"}}>Eduspare Earning</p>
                    <p className="text-center mt-4" style={{fontFamily: "comic sans ms", fontSize: 45, fontWeight: "bold", color: "#00c853"}}>200 L</p>
                </Grid>
            </Grid>
            
        </div>
    )
}
