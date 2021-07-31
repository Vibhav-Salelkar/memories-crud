import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grid, Grow} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import {getPosts} from "./actions/posts"; 

import memories from "./images/memories.png"
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from "./styles";

function App(props) {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPosts());
    }, [currentId ,dispatch]);

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} align="center" variant="h2">Memories</Typography>
                <img className={classes.image} src={memories} alt ="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;