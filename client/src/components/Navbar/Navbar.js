import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router";
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

import useStyles from "./styles";
import memories from "../../images/memories.png"
import { Link, useLocation } from 'react-router-dom';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

function Navbar(props) {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        history.push('/')
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);
    
            // @ts-ignore
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile'))); 
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={memoriesText} alt ="icon" height="45px"/>
                <img className={classes.image} src={memoriesLogo} alt ="icon" height="40px"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div>
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{ user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button> 
                        </div>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;