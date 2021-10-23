import * as api from "../api/index";
import { COMMENT, FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from "constants/actionTypes";

//Action Creators
export const getPosts = ( page ) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const response = await api.fetchPosts(page);
        const {data} = response;
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action);

        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error.message)
    }

}

//get posts when something is searched
export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        const action = { type: FETCH_BY_SEARCH, payload: data }
        dispatch(action);

        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error.message)
    }

}

//single Post
export const getPost = ( id ) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const response = await api.fetchPost(id);
        const {data} = response;
        const action = { type: FETCH_POST, payload: data }
        dispatch(action);

        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error.message)
    }

}

export const createPost = (post, history) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})

        const response = await api.createPost(post);
        const {data} = response;
        history.push(`/posts/${data._id}`)
        const action = { type: CREATE, payload: data}
        dispatch(action);

        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const response = await api.updatePost(id, post);
        const {data} = response;
        const action = { type: UPDATE, payload: data}
        dispatch(action);

    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        const action = { type: DELETE, payload: id}
        dispatch(action);

    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const response = await api.likePost(id);
        const {data} = response;
        const action = { type: LIKE, payload: data}
        dispatch(action);

    } catch (error) {
        console.log(error.message)
    }
}

export const commentPost = (value, id) => async(dispatch) => {
    try {
       const response = await api.comment(value, id);
       const {data} = response;
       dispatch({type: COMMENT, payload: data})
       return data.comments
    } catch (error) {
        console.log(error.message)
    }
}
