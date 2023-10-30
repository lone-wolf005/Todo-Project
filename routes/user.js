import express, { Router } from "express";
import {User} from "../models/user.js";
import { Register, logout } from "../controller/user.js";
import { login } from "../controller/user.js";
import {  getMyprofile } from "../controller/user.js";
import { isAuthenticated } from "../middleware/authe.js";

const router = express.Router();

//  router.get("/all",getAllusers);

 router.post("/new",Register);
 router.post("/login",login);
 router.get("/logout",logout);
 router.get("/me",isAuthenticated,getMyprofile);

export default router; 
