import express from "express";
const router = express.Router();
import { getOrder, paymentComplete } from "../controllers/order.controller.js";

router.get("/", getOrder); //show on order summary

router.post("/payment/complete", paymentComplete);

export default router;
