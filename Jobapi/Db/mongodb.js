import mongoose from "mongoose";

export const Mongodb = async () => {
    try {
        let connect = process.env.MONGO_DB
        let db = await mongoose.connect(connect, {
            dbName: "jobapis"
        })
        console.log(`MongoDB is connected with ${db.connection.name}`);
    } catch (error) {
        console.log(error);
    }
}