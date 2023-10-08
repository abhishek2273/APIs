import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        minlength: [4, "username should be grater than or equal to 4 "],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        validate: [validator.isEmail, "plese enter valid email Id"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "password should be grater than or equal to 6 "],
        select: false,
    },
    isSeller: {
        type: String,
        default: "user",
    }
},
    { timestamps: true }
);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.model("user", userSchema)