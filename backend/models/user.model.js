import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, require: true },
    fullname: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
  },

  { timestamps: true },
);
const User = mongoose.model("User", userSchema);
export { User };
