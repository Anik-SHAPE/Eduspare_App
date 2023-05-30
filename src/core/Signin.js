import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {SignIn, authenticate, isAuthenticated} from "../auth/index";
import {Link, Redirect} from "react-router-dom";
import useState from "react-hook-use-state";
import "../styles.css";
import LoginScreen from "../assets/loginScreen.jpg";
import Logo from "../assets/logobg.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.eduspare.com">
        www.eduspare.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      {' All Rights Reserved'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
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
  image: {
    backgroundImage: `url(${LoginScreen})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {

  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false
  });

  const { email, password, error, didRedirect} = values;
    
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false});
    SignIn({ email, password })
      .then(data => {
        if (data.error) {
          console.log("signin request failed");
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
        console.log("logged in")
    })
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 0) {
        return <Redirect to="/admin/dashboard" />;
      }
      if (user && user.role === 1) {
        return <Redirect to="/institute/admin/dashboard" />;
      }
      if (user && user.role === 2) {
        return <Redirect to="/teacher/dashboard" />;
      }
      if (user && user.role === 3) {
        return <Redirect to="/student/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square style={{backgroundColor: "#ffffff"}}>
        <div className={classes.paper}>
           <center><img src={Logo} style={{width: 73, height: 70}} />
           <p className="pt-3" style={{fontFamily: "comic sans ms", fontWeight: "bold", fontSize: 30}}>
           Signin
           </p>
           </center> 
          
          <form className={classes.form} noValidate>
            <div className="hidedesktop pb-5"/>
            <TextField onChange={handleChange("email")} value={email} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
            <TextField onChange={handleChange("password")} value={password} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
            <Button onClick={onSubmit} type="submit" fullWidth variant="contained" style={{backgroundColor: "#0091ea", borderRadius: 15, outline: 0, color: "#ffffff"}} className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" style={{color: "#ff6f00"}} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" style={{color: "#00c853"}} variant="body2">
                  {"New here? Sign Up"}
                </Link>
              </Grid>
            </Grid>
      
            <Box mt={9} className="hideonmobile">
              <Copyright />
            </Box>
            {performRedirect()}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}