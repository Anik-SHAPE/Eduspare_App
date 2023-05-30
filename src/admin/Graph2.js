import React from 'react'
import { Doughnut } from '@reactchartjs/react-chart.js'

const data = {
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        '#f50057',
        '#2196f3',
        '#ffb300',
        '#00e676',
        '#673ab7',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const DoughnutChart = () => (
  <>
    <div className="row mt-5 ">
        
        <div>
            <Doughnut  data={data} />
        </div>

        <div>
            <p style={{color: "#f50057"}}>Red: 12</p>
            <p style={{color: "#2196f3"}}>Blue: 19</p>
            <p style={{color: "#ffb300"}}>Yellow: 3</p>
            <p style={{color: "#00e676"}}>Green: 5</p>
            <p style={{color: "#673ab7"}}>Violet: 2</p>
        </div>
        
    </div>
  </>
)

export default DoughnutChart
