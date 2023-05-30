import React from 'react';
import "./style.scss";
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import CalendarViewDayRoundedIcon from '@material-ui/icons/CalendarViewDayRounded';

export default function Chat() {
  return (
    <div className="fixed-bottom d-block w-100" style={{height: 75, backgroundColor: "#fafafa"}}>
      <div class="wrappers">
        <div class="bottom-appbar" >
          <div class="tabs"  >
            <div class="tab tab--left">
              <PersonRoundedIcon style={{width: 30, height: 30, color: "#ffffff"}}/>
              <span>Profile</span>
            </div>
            <div class="tab tab--fab">
              <div class="top">
                <div className="fab ml-2 mr-1 mt-1" >
                  <ForumRoundedIcon style={{width: 35, height: 35, color: "#ffffff"}}/>
                </div>
              </div>
            </div>
            <div class="tab tab--right">
              <CalendarViewDayRoundedIcon style={{width: 30, height: 30, color: "#ffffff"}}/>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
