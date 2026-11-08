import express from "express";
import { body } from "express-validator";
import {
  signin,
  signup,
  logout,
  checkVerify,
} from "../controllers/user.controller.js";


const router = express.Router();

const emailValidator = () => body("email").normalizeEmail().isEmail();
const passwordValidator = () => body("password").isLength({ min: 8 });
const nameValidator = () => body("fullname").not().isEmpty();

router.get("/checkAuth", checkVerify);

router.post(
  "/signup",
  emailValidator(),
  passwordValidator(),
  nameValidator(),
  signup,
);

router.post("/signin", emailValidator(), passwordValidator(), signin);
router.post("/logout", logout);

export default router;
