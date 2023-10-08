import jwt from "jsonwebtoken";

export const webToken = (user, statusCode, message, res) => {

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: process.env.JWTEXPIRE,
    })

    let EXPIRE_COOKIES = 2 * 24 * 60 * 60 * 1000
    const options = {
        expires: new Date(Date.now() + EXPIRE_COOKIES),
        httpOnly: true,
    }

    res.status(statusCode).cookie('token', token, options).json({
        sucess: true,
        message,
        user,
    })
}