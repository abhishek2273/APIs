import express from "express";
import { create_product, delete_product, upadte_product } from "../controller/productAdmin.ctrl.js";
import { isAuth, isSeller } from "../middleware/auth.js";
import { allProduct, singleProduct } from "../controller/product.ctrl.js";

const productRouter = express.Router();

//Admin Route
productRouter.post("/new", isAuth, isSeller, create_product)
productRouter.put("/:id", isAuth, isSeller, upadte_product)
productRouter.delete("/:id", isAuth, isSeller, delete_product)

//User Route
productRouter.get("/all", allProduct)
productRouter.get("/details/:id", singleProduct)

export default productRouter;