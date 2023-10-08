import jwt from "jsonwebtoken";
import newError from "../utils/newError.js";
import TryCatch from "./TryCatch.js";
import User from "../module/user.model.js";


export const isAuth = TryCatch(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new newError("You are not Authorized to acsess! please LOGIN"))
    }

    let userDecodedByToken = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(userDecodedByToken.id)
    next();
})

export const isSeller = TryCatch(async (req, res, next) => {
    const isSeller = req.user.isSeller;
    if (isSeller == "admin") {
        return next();
    }
    return next(new newError("You have not 'Seller' account"))
}) 