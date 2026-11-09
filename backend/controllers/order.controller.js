import Order from "../models/order.model.js";
import Stripe from "stripe";
import "dotenv/config";
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const stripe = new Stripe(STRIPE_API_KEY);

async function getOrder(req, res, next) {
  const userEmail = req.session.userEmail;
  const orders = await Order.find({ "userData.email": userEmail });
  res.status(200).json({ orders });
}

async function paymentComplete(req, res, next) {
  const session_id = req.body.session_id;
  const orderId = req.body.oId;
  const session = await stripe.checkout.sessions.retrieve(session_id);
  const order = await Order.findByIdAndUpdate(orderId, {
    status: session.payment_status,
  });

  req.session.order = null;
  req.session.cart = null;
  req.session.save();

  res.status(200).json({ status: session.payment_status });
}

export { getOrder, paymentComplete };
