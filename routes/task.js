import express from 'express';
import { deleteTask, getMytask, newTask, updateTask } from '../controller/task.js';
import { isAuthenticated } from '../middleware/authe.js';

const router = express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMytask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);


export default router;