//  Product Controller by User
import Product from "../module/product.model.js";
import TryCatch from "../middleware/TryCatch.js";
import newError from "../utils/newError.js";

export const allProduct = TryCatch(async (req, res, next) => {
    let product = await Product.find();
    let totalProduct = await Product.countDocuments();
    res.status(201).json({
        sucess: true,
        totalProduct,
        product,
    })
})

export const singleProduct = TryCatch(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new newError(`This Product ID '${req.params.id}' not exist`, 404))
    }

    res.status(200).json({
        sucess: true,
        product
    })
})

