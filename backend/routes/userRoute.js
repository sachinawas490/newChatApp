import express from "express";
import { register, login,logout,otherUser, userInfo } from "../controllers/userController.js";
import protectedRoute from "../config/protectedRoute.js";
const userRouter = express.Router();

// Route to handle user registration
userRouter.post('/register', register);

// Route to handle user login
userRouter.post('/login', login);
userRouter.post('/otherUser',protectedRoute, otherUser);
userRouter.get('/logout', logout);
userRouter.get('/userInfo', protectedRoute,userInfo);
export default userRouter;
