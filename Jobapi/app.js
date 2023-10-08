import express from "express";
import { Mongodb } from "./Db/mongodb.js";
import userRouter from "./routes/user.js";
import { customError } from "./utils/errorHandler.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jobRoutre from "./routes/jobs.js";

const app = express();
dotenv.config();
Mongodb();

app.use(express.json())
app.use(cookieParser());

app.use("/api/v1/users", userRouter)
app.use("/api/v1/jobs", jobRoutre)

app.use(customError)

app.listen(process.env.PORT, () => {
    console.log(`Server is ON `);
})