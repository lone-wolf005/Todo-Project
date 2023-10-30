import jwt from 'jsonwebtoken';

export const sendCookies=(user,res,messege,statusCode=200)=>{

const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

res.status(statusCode).cookie("token",token,{
  httpOnly:true,
  maxAge:15 * 60 *1000,
  samesite:process.env.NODE_ENV ==="Development"?"lax":"none",
  secure:process.env.NODE_ENV==="Development"?false:true,
}).json({
  success:true,
  messege,
});

}
