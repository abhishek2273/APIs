//  Product Controller by Admin
import TryCatch from "../middleware/TryCatch.js";
import Product from "../module/product.model.js";
import newError from "../utils/newError.js";

export const create_product = TryCatch(async (req, res, next) => {
    const product = await Product.create({
        userID: req.user._id,
        ...req.body
    })
    res.status(200).json({
        sucess: true,
        message: "New product added sucessfully",
        product
    })
})

export const upadte_product = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new newError(`This Product ID ${req.params.id} not exist`, 404))
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    let fieldName = Object.keys(req.body)
    res.status(200).json({
        sucess: true,
        message: `this '${fieldName.join(", ")}' field updated sucessfully`,
        updatedProduct,
    })
})

export const delete_product = TryCatch(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new newError(`This Product ID '${req.params.id}' not exist?`, 404))
    await Product.deleteOne();
    res.status(200).json({
        sucess: true,
        message: `This '${req.params.id}' deleted Sucessfully ;`
    })

})

