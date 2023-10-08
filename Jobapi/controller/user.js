import User from "../modules/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import trycatch from "../middleware/trycatch.js";
import bcrypt from "bcryptjs"
import { webToken } from "../utils/jwt.js"; 


export const register = trycatch(async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashPassword })

    webToken(user, 201, `Hello ${user.username}`, res);
})

export const login = trycatch(async (req, res, next) => {
    const { Id, password } = req.body;

    if (!Id || !password) {
        return next(new ErrorHandler("Please enter required field", 400))
    }

    const user = await User.findOne({ $or: [{ email: Id }, { username: Id }] }).select("+password")
    if (!user) {
        return next(new ErrorHandler("User not exist! Please Register", 401));
    }

    let isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
        return next(new ErrorHandler("Wrong Id or password"))
    }

    webToken(user, 201, `Welcome Back ${user.username}`, res);
})

export const logout = trycatch(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(0),
        httpOnly: true,
    }).status(200).json({
        sucess: true,
        message: 'Logout Sucessfully'
    })
})

export const myProfile = trycatch(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        sucess: true,
        user
    })

})