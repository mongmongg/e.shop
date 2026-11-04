import express from "express";
const router = express.Router();
import {
  getOrder,
  getPayment,
  paymentSuccessfully,
  paymentFailure,
} from "../controllers/order.controller.js";

router.get("/", getOrder); //show on order summary

router.post("/payment", getPayment); //link to stripe
router.get("/payment/success", paymentSuccessfully);
router.get("/payment/failure", paymentFailure);

export default router;
