import express from "express";
import { login, logout, myProfile, register } from "../controller/user.js";
import { isAuthentication } from "../middleware/auth.js"

const userRouter = express.Router();

userRouter.post("/new", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.get("/me", isAuthentication, myProfile)

export default userRouter;