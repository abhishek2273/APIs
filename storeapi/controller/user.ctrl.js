import User from "../module/user.model.js";
import TryCatch from "../middleware/TryCatch.js";
import newError from "../utils/newError.js";
import bcrypt from "bcryptjs";
import webToken from "../utils/cookies.js";

export const register = TryCatch(async (req, res, next) => {
    let { username, email, password, isSeller } = req.body;
    if (isSeller === "admin") {
        isSeller = "admin"
    }
    let user = await User.create({
        username, email, password, isSeller
    })
    res.status(200).json({
        sucess: true,
        user
    })
})

export const login = TryCatch(async (req, res, next) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return next(new newError("Please fill required filled?", 404))
    }

    const user = await User.findOne({ $or: [{ email: userId }, { username: userId }] }).select("+password")
    if (!user) {
        return next(new newError("user not found? check again", 404))
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(new newError("Wrong Id or Password?", 404))
    }

    webToken(user, 201, `Welcom back ${user.username}`, res);
})

export const profile = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        sucess: true,
        user
    })
})

export const logout = (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(),
        httpOnly: true
    }).status(200).json({
        sucess: true,
        message: 'User Logout Sucessfully !'
    })
}
