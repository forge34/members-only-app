const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const verify = async (username, password, done) => {
  const user = await User.findOne().where("name").equals(user.username).exec();

  if (!user.errors()) {
    return done(null, false, { message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return done(null, false, { message: "Wrong username or password" });
  }

  return done(null, false);
};

const strategy = new localStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)

  done(null, user);
});
