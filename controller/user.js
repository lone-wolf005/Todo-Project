import {User} from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";



export const getMyprofile =(req,res)=>{
      
      res.status(200).json({
        success:true,
        user:req.user,
      });
 };

 export const login = async(req,res,next)=>{
  try {
    const{email,password}=req.body;
    const user = await User.findOne({email}).select("+password");
if(!user) return ErrorHandler("User is not found",404);      

const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch)return ErrorHandler("Invalid Password",400);

sendCookies(user,res,`welcome back,${user.name}`);
    
  } catch (error) {
    next(error);
  }

 };

 export const Register = async(req,res,next)=>{
  try {
    const {name,email,password}=req.body;

  let user = await User.findOne({email});

  if(user)return ErrorHandler("User is already Exist",400);

  const hashedPassword = await bcrypt.hash(password,10);
  user = await User.create({name,email,password:hashedPassword});
  
  sendCookies(user,res,"register successfully",201);
  } catch (error) {
    next(error);
  }
};

export const getUserdetails = async(req,res,next)=>{
  try {
    const{id}=req.user._id;
    const user = await User.findById(id);
   res.json({
     success:true,
     user,
   });
    
  } catch (error) {
    next(error);
  }
};
export const logout = (req,res)=>{
  res.status(200).cookie("token","",{
    expire:new Date (Date.now()),
    samesite:process.env.NODE_ENV ==="Development"?"lax":"none",
    secure:process.env.NODE_ENV==="Development"?false:true,
  
    }).
  json({
    success:true,
  });
    
};

