import { Product } from "../models/product.model.js";
async function getProducts(req, res, next) {
  console.log("Getting Data");
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    next(error);
  }
  res.status(200).json({ message: "Getting products data", products });
}
async function getProductDetail(req, res, next) {
  const { id } = req.params;
  let product;
  try {
    product = await Product.findById(id);
  } catch (error) {
    next(error);
  }
  res.status(200).json({ message: "Getting product detail by id", product });
}

export { getProducts, getProductDetail };
