import { Router } from "express";
import { createUser, generateToken } from "../controllers/users_controller";

const userRouter = Router();

userRouter.post('/createUser', createUser);
userRouter.post('/login', generateToken);


export {userRouter};

