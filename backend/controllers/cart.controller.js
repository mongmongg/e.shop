import { Product } from "../models/product.model.js";
import { handleReqInput } from "./user.controller.js";
function getCart(req, res, next) {
  const cart = req.session.cart;
  if (!cart) {
    res.status(200).json({ message: "Empty Cart Data", cart: null });
  }
  res.status(200).json({ message: "Get Cart Data", cart: cart });
}

async function addCartItem(req, res, next) {
  const { id } = req.body;
  //console.log(req.body);
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
  console.log(req.body.totalPrice);
  req.session.cart = cart;
  req.session.save();
  res.status(201).json({ message: "Cart updated" });
}

async function checkingOut(req, res, next) {
  //console.log(req.body);
  if (handleReqInput(req, next)) return;
  const DOMAIN = "http://localhost:3000";
  const cart = res.locals.cart;
  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "thb",
          product_data: {
            name: item.product.name,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${DOMAIN}/order/payment/success`,
    cancel_url: `${DOMAIN}/order/payment/failure`,
  });

  res.redirect(303, session.url);
}

export { getCart, addCartItem, checkingOut };
