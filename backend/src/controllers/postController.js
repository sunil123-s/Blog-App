import User from "../models/userModels.js";
import Post from "../models/postModels.js";
import { ImageUpload, ImageDelete } from "../utils/UploadCloudinary.js";

export const createPost = async(req , res) => {
    try {

      const { title, description, category, thumbnail } = req.body;

      const userId = req.user._id;

      if (!title || !description || !category) {
        return res
          .status(404)
          .json({ success: false, message: "All Filed Required" });
      }

      const newPost = new Post({
        title,
        description,
        category,
        thumbnail,
        creator: userId,
      });

      const currentUser = await User.findById(userId);
      currentUser.posts += 1;
      await Promise.all([currentUser.save(), newPost.save()]);

      return res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Failed to create post",
            error: error.message,
          });
    }
}

export const getAllPost = async(req , res) => {
    try {
        const allPost = await Post.find().sort({updatedAt: -1})
        res.status(200).json({success:true, data:(allPost)})
    } catch (error) {
         res.status(500).json({ success: false, message:"failed to get post" });
    }
}

export const getSinglePost = async(req , res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({success:false, message:"post not Found"})
        }
        res.status(200).json({success:true, data:(post)})
    } catch (error) {
        res.status(500).json({ success: false, message: "failed to get post" });
    }
}

export const getPostByCategory = async(req , res) => {
    try {
        const {category} = req.params;
        const post = await Post.find({category}).sort({createdAt: -1})
        if(!post){
             return res.status(404).json({ success:false, message:"post not found"});
        }
        res.status(200).json({success:true, data:(post)})
    } catch (error) {
         res.status(500).json({ success: false, message:"filed to get post" });
    }
}

export const getPostByAuthors = async(req , res) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
         if (!posts) {
           return res
             .status(404)
             .json({ success: false, message: "posts not found" });
         }
         res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: "filed to get post" });
    }
}

export const editPost = async(req , res) => {
    try {
        const postId = req.params.id;
        console.log(postId,"postid")
        const { title, description, category, thumbnail } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            description,
            category,
            thumbnail
          },
          { new: true, runValidators: true }
        ); 
        
        return res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
          return res.status(500).json({success: false,message: "Failed to update post", error: error.message,});
    }
}

export const deletePost = async(req , res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id

        const existingPost = await Post.findById(postId);
        if (!existingPost) {
          return res
            .status(404)
            .json({ success: false, message: "Post not found" });
        }

        if(existingPost.thumbnail){
            await ImageDelete(existingPost.thumbnail)
        }
        
        const currentUser = await User.findById(userId)
        if (currentUser.posts > 0) {
          currentUser.posts -= 1;
          await currentUser.save();
        }

        await existingPost.deleteOne()
        res.status(200).json({success:true,message:"post deleted"})
    } catch (error) {
        console.log(error.message)
         res.status(500).json({ success: false, message: "failed to delete" });
    }
}