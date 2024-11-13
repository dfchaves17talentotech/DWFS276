import { Router } from "express";
import { createUser } from "../controllers/users_controller";

const userRouter = Router();

userRouter.post('/createMovie', createUser);

export {userRouter};

