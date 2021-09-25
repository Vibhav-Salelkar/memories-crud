import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import { useSelector } from 'react-redux';

import useStyles from "./styles";

function Posts({setCurrentId}) {
    const {posts, isLoading} = useSelector((state) => {
        // @ts-ignore
        return state.posts;
    })
    const classes = useStyles();

    if(!posts?.length && !isLoading) {
        return <div>No Posts</div>;
    }

    return (
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => {
                    return (<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post setCurrentId={setCurrentId} post={post} />
                    </Grid>)
                })}
            </Grid>
        )
    );
}

export default Posts;