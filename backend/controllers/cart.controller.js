import Order from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { handleReqInput } from "./user.controller.js";
//import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
const STRIPE_API_KEY =
  "sk_test_51UHfVwRritMctMjYC8UpmcUHAJOWE1R0cPg2wBXQrPnIIGsVaX3mfPJGeGTYVMQjWsAeJ7QEvVBuRSf6Z72lxy5r00gSOAAipY";

const stripe = new Stripe(STRIPE_API_KEY);

function getCart(req, res, next) {
  const cart = req.session.cart;
  if (!cart) {
    return res.status(200).json({ message: "Empty Cart Data", cart: null });
  }
  res.status(200).json({ message: "Get Cart Data", cart: cart });
}

async function updateCartItem(req, res, next) {
  const { id } = req.body;
  let product;
  try {
    product = await Product.findById(id);
  } catch (error) {
    next(error);
  }
  const cart = { items: [], totalQuantity: 0, totalPrice: 0 };
  cart.items = [...req.body.items];
  cart.totalQuantity = req.body.totalQuantity;
  cart.totalPrice = req.body.totalPrice;
  req.session.cart = cart;
  req.session.save();
  res.status(201).json({ message: "Cart updated" });
}

async function checkingOut(req, res, next) {
  if (handleReqInput(req, next)) return;
  const DOMAIN = "http://localhost:5173";
  const cart = req.session.cart;
  const userData = req.body;

  req.session.order = { userData, order: cart };
  req.session.save();
  const orderData = { userData: req.body, productsData: cart };
  const newOrder = new Order(orderData);
  await newOrder.save();
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "hosted_page",
      line_items: cart.items.map(function (item) {
        return {
          price_data: {
            currency: "thb",
            product_data: {
              name: item.name,
            },
            unit_amount: +item.price.toFixed(2) * 100,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${DOMAIN}/payment/${newOrder._id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/payment/${newOrder._id}?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getCart, updateCartItem, checkingOut };
