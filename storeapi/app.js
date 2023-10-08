import express from "express"
import dotenv from "dotenv"
import dbConnection from "./config/db.js";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./utils/newError.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.route.js";


const app = express();

dotenv.config({ path: "config/config.env" })
dbConnection()

//middleware
app.use(express.json());
app.use(cookieParser())

//routers
app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})