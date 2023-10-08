import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        let db = await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'storeApi'
        })
        console.log(`DB connected with ${db.connection.name}`);
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;