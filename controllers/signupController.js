const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

function signupGet(req, res, next) {
  res.render("signup");
}

const userExists = async (username) => {
  const exists = await User.findOne({ name: username });

  if (exists) {
    throw new Error("Username already exists , try another name");
  }
};

const confirmPassword = async (pass, { req }) => {
    console.log(pass,req.body.password)
    return pass === req.body.password
};

const signupPost = [
  body("firstname")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Minimum length is 5")
    .escape(),
  body("lastname")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Minimum length is 5")
    .escape(),
  body("username").trim().isLength({ min: 5 }).escape().custom(userExists),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Minimum length is 5")
    .escape(),
  body("confirmPassword")
  .trim().isLength({min:5}).withMessage("Minimum length is 5")
    .custom(confirmPassword)
    .withMessage("Passwords don't match"),

  expressAsyncHandler(signup),
];

async function signup(req, res, next) {
  const errors = validationResult(req);

  console.log(errors);

  if (errors.isEmpty()) {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        membership: "Normal",
      });
      console.log(user);
      await user.save();
      res.redirect("/");
    });
  } else {
    res.redirect("/signup");
  }
}

module.exports = {
  signupGet,
  signupPost,
};
