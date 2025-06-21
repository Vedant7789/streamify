import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import mongoose  from "mongoose";

export async  function signup(req,res){
    const {email,password,fullName}=req.body;
    try{
        if(!email||!password||!fullName){
            return res.status(400).json({message:"all field are required"});

        }
    if(password.length<6){
        return res.status(400).json({message:"password must be atleast 6 character"});

    }
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message:"invalid email format"});

    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"email already exists"})
    }

    const idx=Math.floor(Math.random()*100)+1;
    const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser=await User.create({
        email,
        fullName,
        password,
        profilePic:randomAvatar,
    });

    const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
          expiresIn:"7d"
    });
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="production",
    })

    res.status(201).json({success:true,user:newUser})

    


    }
    catch(error){
        console.log("error in signup controller ",error);
        res.status(500).json({message:"internal server error"}); 

    }


}



export async function login(req,res){
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"all fields are required"});

        }
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({message:"invalid credentials"});

        const isPasswordCorrect=await user.matchPassword(password);

    }
    catch(error){


    }
    
}
 export function logout(req,res){
    res.send("logout route ");
 } 