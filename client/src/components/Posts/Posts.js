import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import { useSelector } from 'react-redux';

import useStyles from "./styles";

function Posts({setCurrentId}) {
    const posts = useSelector((state) => {
        // @ts-ignore
        return state.posts;
    })
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => {
                    return (<Grid key={post._id} item xs={12} sm={6}>
                        <Post setCurrentId={setCurrentId} post={post} />
                    </Grid>)
                })}
            </Grid>
        )
    );
}

export default Posts;