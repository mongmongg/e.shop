import Order from "../models/order.model.js";
import { Product } from "../models/product.model.js";

async function getAllOrders(req, res, next) {
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
  const newProduct = req.body;
  console.log(newProduct);
}
async function updateProduct(req, res, next) {
  const { pId } = req.body;
  //const updated = await Product.findByIdAndUpdate(pId, { $set: {} });
}

async function deleteProduct(req, res, next) {
  const { pId } = req.body;
}

export { getAllOrders, updateStatus, addProduct, updateProduct, deleteProduct };
