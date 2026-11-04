import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { HttpError } from "../models/http-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { createUserSession } from "../util/authentication.js";
// import passport from "passport";
const TOKEN_KEY = "SECRETTOKEN";

export const handleReqInput = (req, next) => {
  const result = validationResult(req);
  const errors = result.array();
  if (errors.length > 0) {
    console.log("Input error" + errors);
    next(new HttpError("Invalid inputs, please check your inputs", 422));
    return true;
  }
  return false;
};

async function signup(req, res, next) {
  if (handleReqInput(req, next)) return;

  const { email, password, fullname } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later",
      500,
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "This account exists already, please try to login",
      401,
    );
    return next(error);
  }
  const newUser = new User({
    fullname,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    // req.logIn(newUser, (err) => {
    //   if (err) return next(err);

    //   return res.status(201).json({
    //     message: "Sign up and logged in successfully",
    //     user: {
    //       id: newUser._id,
    //       email: newUser.email,
    //       fullname: newUser.fullname,
    //     },
    //   });
    // });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Signing up failed, please try again later",
      500,
    );
    return next(error);
  }

  const token = jwt.sign(
    { userId: newUser._id.toString(), email, fullname },
    TOKEN_KEY,
    { expiresIn: "24h" },
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    // secure: true,
    secure: false,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "Sign up successfully",
    token,
    userData: { _id: newUser._id.toString(), email, fullname },
  });
}
// function signin(req, res, next) {
//   return res.status(200).json({
//     message: "Signed in successfully",
//     user: {
//       id: req.user._id,
//       email: req.user,
//       email,
//       fullname: req.user.fullname,
//     },
//   });
// }
async function signin(req, res, next) {
  handleReqInput(req);

  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try to login again later",
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Could not find this account, please try to sign up",
      401,
    );
    return next(error);
  }
  try {
    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isCorrectPassword) {
      const error = new HttpError("Invalid email or password", 401);
      return next(error);
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Sign in failed, please try again later");
    return next(error);
  }
  const token = jwt.sign(
    {
      userId: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    },
    TOKEN_KEY,
    { expiresIn: "1h" },
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "Sign in successfully",
    token,
    userData: {
      _id: existingUser._id.toString(),
      email: existingUser.email,
      fullname: existingUser.fullname,
    },
  });
}
// function signin(req, res, next) {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) return next(err);
//     if (!user) {
//       return next(new HttpError(info.message || "Invalid credentials", 401));
//     }
//     req.login(user, (err) => {
//       if (err) return next(err);
//       return res.status(200).json({
//         message: "Signed in successfully",
//         user: {
//           id: req.user._id,
//           email: req.user.email,
//         },
//       });
//     });
//   })(req, res, next);
// }

function logout(req, res, next) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({ message: "Logged out" });
}

export { signin, signup, logout };
