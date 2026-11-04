import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export { User };
