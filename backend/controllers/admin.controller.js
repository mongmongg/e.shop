import { HttpError } from "../models/http-error.js";
import Order from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import cloudinary from "../data/cloudinary.js";

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
  const { name, summary, description, price } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a product image" });
  }
  const fileBase64 = req.file.buffer.toString("base64");
  const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: "e-shop",
    });
    const newProdData = new Product({
      name,
      summary,
      description,
      price,
      image: uploadResponse.secure_url,
    });
    await newProdData.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Error adding product", 500);
    next(error);
  }
}
async function updateProduct(req, res, next) {
  const pId = req.params.pId;
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a product image" });
  }
  const fileBase64 = req.file.buffer.toString("base64");
  const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;
  let uploadResponse;
  try {
    uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: "e-shop",
    });
  } catch (err) {
    console.log(err);
    // const error = new HttpError("Error adding product", 500);
    next(err);
  }
  const { name, summary, description, price } = req.body;
  const updatedData = {
    name,
    summary,
    description,
    price,
    image: uploadResponse.secure_url,
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
