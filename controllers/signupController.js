const User = require("../models/userModel");
const bcrypt = require("bcryptjs")

function signupGet(req, res, next) {
  res.render("signup");
}

function signupPost(req, res, next) {

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

}

module.exports = {
  signupGet,
  signupPost,
};
