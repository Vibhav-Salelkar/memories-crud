import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    post.tags = post.tags.split(',');

    //creator is taken from user authenticated and not manually entered in form UI
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({messgae: error.message})
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post Found');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id, createdAt: new Date()}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post Found');
    }

    const deletedPost = await PostMessage.findByIdAndRemove(_id); 

    res.json({message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const {id: _id} = req.params;
    
    //if user is not authenticated
    if(!req.userId) return res.json({message: "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post Found');
    }

    const post = await PostMessage.findById(_id);

    //find if likes has current users id
    const index = post.likes.findIndex((id) => id === String(req.userId)); 

    //if not add id to likes list else remove it
    if(index === -1) {
        post.likes.push(req.userId);
    }else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})

    res.json(updatedPost);
}








/** 
 * old code for likes controller: without middleware and unlimited likes
 export const likePost = async (req, res) => {
    const {id: _id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post Found');
    }

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount + 1}, {new: true})

    res.json(updatedPost);
}

 *old code for create post
 export const createPost = async (req, res) => {
    const post = req.body;

    post.tags = post.tags.split(',');

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({messgae: error.message})
    }
}
*/
