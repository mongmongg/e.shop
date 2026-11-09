import express from "express";
import { connectToMongoDB } from "./data/database.js";
import cors from "cors";
import { corsOptioncs } from "./middleware/CORS.js";
import session from "express-session";
import "dotenv/config";
import { createSessionConfig } from "./data/session.config.js";

import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";
import adminRoute from "./routes/admin.route.js";
import checkAuthToken from "./util/authentication.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.use(cors(corsOptioncs));

app.use(session(createSessionConfig()));

app.use(userRoute);
app.use(productRoute);

app.use("/cart", cartRoute);
app.use(checkAuthToken);
app.use("/order", orderRoute);
app.use("/admin", adminRoute);

app.use((error, req, res, next) => {
  const status = error.code || 500;
  const message = error.message || "Something went wrong.";
  console.log(error);
  res.status(status).json({ message: message });
});

connectToMongoDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Started on port ${PORT}`);
  });
});

export default app;
