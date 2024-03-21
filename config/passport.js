const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const verify = async (username, password, done) => {
  const user = await User.findOne().where("username").equals(username).exec();


  const match = await bcrypt.compare(password, user.password);
  
  if (!match) {
    return done(null, false, { message: "Wrong username or password" });
  }

  return done(null, user);
};

const strategy = new localStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).select({password:0});

  done(null, user);
});
