import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductDetail,
} from "../controllers/customer.controller.js";

router.get("/products", getProducts);
router.get(
  "/products/detail/:id",
  router.get("/products/detail/:id", getProductDetail),
);

export default router;
