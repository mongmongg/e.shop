import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    price: { type: Number, require: true, min: 0 },
    summary: { type: String, require: true },
    description: { type: String },
    image: { type: String, require: true },
  },

  { timestamps: true },
);
const Product = mongoose.model("Product", productSchema);
export { Product };
