import React, { useState } from "react";
import { useHistory } from "react-router";
import {useDispatch} from 'react-redux';

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { GoogleLogin } from "react-google-login";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";

import {signin, signup} from '../../actions/auth';

const initialState = {
  firstName : '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function Auth(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignUp) {
      dispatch(signup(formData, history));
    }else {
      dispatch(signin(formData, history));
    }
  };

  const handleTestClick = () => {
    setFormData({
      ...formData,
      email:"test@email.com",
      password:"test@123"
    })
    if(isSignUp) {
      dispatch(signin(formData, history));
    }else {
      dispatch(signin(formData, history));
    }  
  }

  const handleChange = (e) => {
    let currentInput = e.target.name;
    let currentInputValue = e.target.value;
    setFormData({...formData, [currentInput]: currentInputValue })
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevValue) => !prevValue);
    setShowPassword(false);
  };

  const googleSucess = async(res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        dispatch({ type: 'AUTH', data: { result, token} });
        history.push('/')
    } catch(error) {
        console.log(error);
    }
  }

  const googleFailure = () => {
      console.log("Google Sign In was unsuccessful. Try Again Later.");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  type="text"
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                handleChange={handleChange}
                label="Repeat Password"
                type="password"
              />
            )}
          </Grid>
          <Button
            onClick={handleTestClick}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{marginBottom: "-0.5rem"}}
          >
            {"Sign in with test credentials"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleLogin
            clientId="82456334507-1av5kvavi5u31247qs1arhffsi524uek.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSucess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
