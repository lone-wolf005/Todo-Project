
import {Task} from "../models/task.js";
import ErrorHandler from "../middleware/error.js";

export const newTask = async(req,res,next)=>{
       try {
         const {title ,description}=req.body;

         await Task.create({
             title,
             description,
             user:req.user,
         });
         res.status(201).json({
            success:true,
            messege:"task added successfully",
         });
         
       } catch (error) {
         next(error);
       }
}
export const getMytask= async(req,res,next)=>{
         try {
            const userid=req.user._id;
            const tasks = await Task.find({user:userid});
           res.status(200).json({
              success:true,
              tasks,
           });
            
         } catch (error) {
            next(error);
         }
}
export const updateTask= async(req,res,next)=>{
        //    const id = req.params.id;
        //    const {id}=req.params;

      try {
         const task = await Task.findById(req.params.id);
         if(!task){
          return next(new ErrorHandler("Invalid Operation",404));
         }
         task.isCompleted= !task.isCompleted;
         await task.save();


        res.status(200).json({
           success:true,
           messege:"task updated",
        });
      } catch (error) {
         next(error);
      }
}
export const deleteTask= async(req,res,next)=>{
         try {
            const task = await Task.findById(req.params.id);
            if(!task){
             return next(new ErrorHandler("Invalid Operation",404));
            }
            task.isCompleted= !task.isCompleted;
            await task.save();
  
  
           res.status(200).json({
              success:true,
              messege:"task updated",
           });
            
         } catch (error) {
            next(error);
         }
}