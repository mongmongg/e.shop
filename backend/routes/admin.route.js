import express from "express";
import {
  getAllOrders,
  updateStatus,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";
import fileUpload from "../middleware/file-upload.js";
const router = express.Router();

router.get("/orders", getAllOrders);
router.patch("/updateOrder", updateStatus);

router.post("/product", fileUpload.single("image"), addProduct);
router.patch("/product/:pId/edit", fileUpload.single("image"), updateProduct);
router.delete("/product/delete", deleteProduct);

export default router;
