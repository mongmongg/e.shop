import express from "express";
import { body } from "express-validator";
const router = express.Router();
import {
  updateCartItem,
  getCart,
  checkingOut,
} from "../controllers/cart.controller.js";

const emailValidator = () => body("email").normalizeEmail().isEmail();
const firstNameValidator = () => body("firstName").not().isEmpty();
const lastNameValidator = () => body("lastName").not().isEmpty();
const addressValidator = () => body("address").not().isEmpty();
const cityValidator = () => body("city").not().isEmpty();
const postalValidator = () => body("postal").not().isEmpty();
const phoneValidator = () => body("phone").not().isEmpty();

router.get("/", getCart); //cart page
router.post("/items", updateCartItem); // /cart/items
router.post(
  "/checkout",
  firstNameValidator(),
  lastNameValidator(),
  addressValidator(),
  cityValidator(),
  postalValidator(),
  emailValidator(),
  phoneValidator(),
  checkingOut,
);

export default router;
