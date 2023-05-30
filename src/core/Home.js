import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Login from "./Signin";


const useStyles = makeStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: '#00aeef',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#00c853',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00aeef',
      },
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
  },
}));

const Home = ()  => {

    const classes = useStyles();

    return (
      <div>
        <Login/>
      </div>
    )
}

export default Home;
