import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    name: { type: String },
    summary: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    totalPrice: { type: Number },
  },
  { _id: false },
);

export const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  totalQuantity: { type: Number },
  totalPrice: { type: Number },
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
