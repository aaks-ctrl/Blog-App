import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


// http codes 
// https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa0lWZGMzdHpCSFpkZUZzSlFPM2hsUHg0MDhkd3xBQ3Jtc0tsZE1nWUVRVkxMdkxWOGdiZ3ZUS3QzZTVYaGVDRlY5ZDM5Y0JjSGxBSFF5RW1WeUl4cnZUNG55Yi13T3hDelpEemdudTd3VHNGQzFvWXZUb0pMLVRLdUt6TWxOWFB5OGp2b3VETmthS1g4b1JoNTVhOA&q=https%3A%2F%2Fwww.restapitutorial.com%2Fhttpstatuscodes.html&v=VsUzmlZfYNg

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
};

export const createPost = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req,res) => {
    const {id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post, _id}, {new : true});
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id : _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.json({message : "Post deleted successfully"});
}

export const likePost = async (req,res) => {
    const {id : _id } = req.params;

    if(!req.userId) return res.json({message : "Unauthenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

   const post = await PostMessage.findById(_id);
   const index = post.likes.findIndex((id) => id === String(req.userId)).length;
   if(index===-1){
    post.likes.push(req.userId);
   }else{
    post.likes = post.likes.filter((id)=> id!== String(req.userId));
   }
   const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new:true});
   res.json(updatedPost);
}