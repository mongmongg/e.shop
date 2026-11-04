import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { HttpError } from "../models/http-error.js";
import { User } from "../models/user.model.js";

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {        
      const error = new HttpError(
        "Something went wrong, please trya again later",
      );
      return done(error);
    }
    if (!existingUser) {
      return done(null, false, {
        message: "Could not find this account, please try to sign up",
      });
    }
    try {
      const isCorrectPassword = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isCorrectPassword) {
        return done(null, false, {
          message: "Invalid email or password",
        });
      }
      return done(null, existingUser);
    } catch (err) {
      return done(err);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
