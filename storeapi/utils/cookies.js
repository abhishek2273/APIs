import Jwt from "jsonwebtoken";

const webToken = (user, statusCode, message, res) => {
    const payload = { id: user._id };
    const options = {
        expiresIn: "1h",
        httpOnly: true,
    }

    let token = Jwt.sign(payload, process.env.SECRET_KEY)
    res.status(statusCode).cookie("token", token, options).json({
        sucess: true,
        message,
        user
    })
}

export default webToken;