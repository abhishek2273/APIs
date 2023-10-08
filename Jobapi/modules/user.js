import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please choose a username"],
        minlength: [4, "username should be grater than or equal to 4 "],
        unique: [true, "this username already taken"]
    },
    email: {
        type: String,
        required: [true, "please enter mail id"],
        validate: [validator.isEmail, "please enter a valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minlength: [6, "password should be grater than or equal to 6 "],
        select: false,
    },
},
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema)

export default userModel;