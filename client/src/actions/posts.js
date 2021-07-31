import * as api from "../api/index";
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "constants/actionTypes";

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const response = await api.fetchPosts();
        const {data} = response;
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action);

    } catch (error) {
        console.log(error.message)
    }

}

export const createPost = (post) => async(dispatch) => {
    try {
        const response = await api.createPost(post);
        const {data} = response;
        const action = { type: CREATE, payload: data}
        dispatch(action);

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