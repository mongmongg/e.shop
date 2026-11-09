import { HttpError } from "../models/http-error.js";
import Order from "../models/order.model.js";
import { Product } from "../models/product.model.js";

async function getAllOrders(req, res, next) {
  //console.log("orders");
  const orders = await Order.find();

  res.status(200).json({ orders });
}
async function updateStatus(req, res, next) {
  const orderId = req.body.id;
  const newStatus = req.body.status;
  const updated = await Order.findByIdAndUpdate(orderId, { status: newStatus });
  res.json(200).json({ message: "order status updated" });
}

async function addProduct(req, res, next) {
  console.log("new product");
  const { name, summary, description, price } = req.body;
  const newProdData = new Product({
    name,
    summary,
    description,
    price,
    image: req.file.path,
  });
  await newProdData.save();
}
async function updateProduct(req, res, next) {
  const pId = req.params.pId;
  const { name, summary, description, price } = req.body;
  const updatedData = {
    name,
    summary,
    description,
    price,
    image: req.file.path,
  };
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: pId },
      { $set: updatedData },
      { returnDocument: "after" },
    );
  } catch (err) {
    const error = new HttpError("Something went wrong while updating", 500);
    console.log(err);
    next(error);
  }
  res.status(200).json({ message: "updated" });
}

async function deleteProduct(req, res, next) {
  const { pId } = req.body;
}

export { getAllOrders, updateStatus, addProduct, updateProduct, deleteProduct };
