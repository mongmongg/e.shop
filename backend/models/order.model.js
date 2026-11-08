import mongoose from "mongoose";
import { cartSchema } from "./cart.model.js";

const orderSchema = new mongoose.Schema({
  userData: {
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    city: { type: String },
    postal: { type: String },
    phone: { type: Number },
  },
  productsData: cartSchema,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "delivered", "cancelled"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
