import Cart from "../models/cart.model.js";
function initializeCart(req, res, next) {
  let cart = { items: [], totalQuantity: 0, totalPrice: 0 };
  if (!req.session.cart) {
  } else {
    const sessionCart = req.session.cart;
    cart = { items: [], totalQuantity: 0, totalPrice: 0 };
    cart.items = [...sessionCart.items];
    cart.totalQuantity = sessionCart.totalQuantity;
    cart.totalPrice = sessionCart.totalPrice;
  }
  res.locals.cart = cart;
  //console.log(req.session.cart);
  next();
}
export default initializeCart;
