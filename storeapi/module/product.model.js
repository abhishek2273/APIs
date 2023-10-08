import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "user"
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    sellerName: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stocksQty: {
        type: Number,
        default: 1,
    }
},
    {
        timestamps: true,
    }
)

const Product = mongoose.model("product", productSchema);
export default Product;