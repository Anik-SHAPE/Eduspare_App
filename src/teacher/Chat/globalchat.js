import React from 'react';
import "../../styles.css";
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import { Card } from '@material-ui/core';

export default function globalchat() {
    return (
        <Card className="chat shadow hideonmobile" style={{backgroundColor:"#329c08", borderRadius: 90, width: 60, height: 60}}>
            <center><ForumRoundedIcon className="mt-1" style={{width: 42, height: 42, color: "#ffffff"}}/></center>
        </Card>
    )
}
