import User from "../models/userModels.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { ImageUpload } from "../utils/UploadCloudinary.js";

dotenv.config()
const jwt_secret = process.env.JWT_SECRET;

export const registerUser = async (req , res) => {
    try {
        const {name, email, password,avatar, confirmPassword} = req.body;

        if(!name || !email || !password){
            return res.status(404).json({success:false, message:"Required All Fields"})
        }
        const newEmail = email.toLowerCase()
    
        const existingUser = await User.findOne({email:newEmail})
        if(existingUser){
             return res
               .status(404)
               .json({ success: false, message: "User already exits" });
        }

        if(password.trim().length < 6){
             return res
               .status(404)
               .json({ success: false, message: "Too Short password" });
        }

        if(password != confirmPassword){
             return res
               .status(404)
               .json({ success: false, message: "password does not match" });
        }
       
        const hashpassword = await bcrypt.hash(password,10)
   
        const newUser = new User({name, email:newEmail,password:hashpassword, avatar})
        const token = jwt.sign({ userId: newUser._id }, jwt_secret, {
          expiresIn: "7d",
        });

        await newUser.save()

       res.status(200).json({success:true, data:{
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        posts:newUser.posts,
        avatar:newUser.avatar,
        token
       }})

    } catch (error) {
        res.status(500).json({success:false, message:"failed to register"})
    }
}

export const LoginUser = async(req , res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
             return res
               .status(404)
               .json({ success: false, message: "Required All Fields" });
        }

        const newEmail = email.toLowerCase();
        const existingUser = await User.findOne({email:newEmail})
        if(!existingUser){
            return res
              .status(404)
              .json({ success: false, message: "Invalid credentials" });
        }
        
        const comparePassword = await bcrypt.compare(password, existingUser.password)
        if(!comparePassword){
          return res
               .status(404)
               .json({ success: false, message: "Invalid credentials" });
        }
       
        const token = jwt.sign({userId:existingUser._id},jwt_secret,{expiresIn:"7d"})
         
        res.status(200).json({
          success: true,
          data: {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            posts: existingUser.posts,
            avatar: existingUser.avatar,
            token,
          },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "failed to Login" });
    }
}

export const getUesr = async(req,res) => {
  try {
    const id = req.params.id   
    const getuser = await User.findById(id)
    if(!getuser){
      res.status(500).json({ success: false, message: "user not found" });
    }
    res.status(200).json({success:true, data:getuser})
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to get info" });
  }
}

export const getAllUsers = async(req, res) => {
  try {
    const allUser = await User.find().select("-password");
    res.status(200).json({success:true, data:(allUser)})
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to GetUser" });
  }
};

export const changeAvatar = async(req , res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await ImageUpload(url);

      const response = {
        success:true,
        data: result.secure_url,
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "failed to upload Imge" });
    }
}


export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, currentPassword, newPassword, newConfirmPassword, avatar } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    if (currentPassword || newPassword || newConfirmPassword) {
      if (!currentPassword || !newPassword || !newConfirmPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Please fill all password fields" });
      }

      const validPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid current password" });
      }

      if (newPassword !== newConfirmPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Passwords don't match" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Failed to Edit User" });
  }
};
