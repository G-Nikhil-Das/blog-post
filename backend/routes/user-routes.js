import express from "express";
import { register, login } from './../controllers/user-controller'

const userRouter = express.Router();

// userRouter.get("/", getAllUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", login);

export default userRouter;