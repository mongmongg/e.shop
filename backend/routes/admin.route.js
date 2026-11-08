import express from "express";
import {
  getAllOrders,
  updateStatus,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/orders", getAllOrders);
router.patch("/updateOrder", updateStatus);

router.post("/product", addProduct);
router.patch("/product/edit", updateProduct);
router.delete("/product/delete", deleteProduct);

export default router;
