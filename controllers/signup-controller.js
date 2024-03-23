const { body, validationResult } = require("express-validator");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

/* Sign up get */
function signupGet(req, res, next) {
  res.render("signup");
}

/* Check if user exists function */
const userExists = async (username) => {
  const exists = await User.findOne({ name: username });

  if (exists) {
    throw new Error("Username already exists , try another name");
  }
};

/* Confirm password */
const confirmPassword = (pass, { req }) => {
  return pass === req.body.password;
};

/* POST : signup controller  */
const signupPost = [
  // validate Firstname
  body("firstname").trim().notEmpty().escape(),

  // Validate lastname
  body("lastname").trim().notEmpty().escape(),

  // Validate Username
  body("username").trim().notEmpty().escape().custom(userExists),

  // Validate password
  body("password")
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage("Minimum length is 5")
    .escape(),

  // confirm password validation
  body("confirmPassword")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Minimum length is 5")
    .escape()
    .custom(confirmPassword)
    .withMessage("Passwords don't match"),
  body("admin").toBoolean(),
  expressAsyncHandler(signup),
];

/* sign up user function */
async function signup(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        is_admin: req.body.admin,
        membership: "Normal",
      });
      console.log(user);
      await user.save();
      res.redirect("/");
    });
  } else {
    console.log(errors);
    res.redirect("/signup");
  }
}

module.exports = {
  signupGet,
  signupPost,
};
