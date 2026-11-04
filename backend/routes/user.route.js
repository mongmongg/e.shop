import express from "express";
import { body } from "express-validator";
import { signin, signup, logout } from "../controllers/user.controller.js";
import passport from "passport";
import checkAuthToken from "../util/authentication.js";

const router = express.Router();

const emailValidator = () => body("email").normalizeEmail().isEmail();
const passwordValidator = () => body("password").isLength({ min: 8 });
const nameValidator = () => body("fullname").not().isEmpty();

router.get("/checkAuth", checkAuthToken, (req, res) => {
  return res.status(200).json({ message: "verified", isAuthenticated: true });
});

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
