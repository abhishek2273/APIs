import User from "../modules/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import tryCatch from "./trycatch.js";

export const isAuthentication = tryCatch(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("Login to access...", 404))
    }

    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = await User.findById(decoded.id)
    next();
})
