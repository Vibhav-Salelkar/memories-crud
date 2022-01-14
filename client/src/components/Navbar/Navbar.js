import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router";
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

import useStyles from "./styles";
import { Link, useLocation } from 'react-router-dom';


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
        <AppBar className={classes.navBar} position="static" color="inherit">
            <Link to="/" className={classes.navLogoLink}>
                <span className={classes.navLogo}>
                    V<span className={classes.navLogoSecondary}>Social</span>
                </span>
            </Link>
            <Toolbar className={classes.navProfileSection}>
                {user ? (
                    <div className={classes.navUserProfile}>
                        <div className={classes.navProfile}>
                            <Avatar className={classes.navAvatarColor} alt={user.result.name} src={user.result.imageUrl}>{ user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.navUserName} variant='h6'>{user.result.name}</Typography>
                        </div>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button> 
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