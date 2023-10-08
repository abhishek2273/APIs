import express from "express"
import {
    login,
    logout,
    profile,
    register
} from "../controller/user.ctrl.js"
import { isAuth } from "../middleware/auth.js";

let userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/me", isAuth, profile)
userRouter.get("/logout", logout)

export default userRouter;