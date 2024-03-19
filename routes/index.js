const express = require("express");
const { signupGet, signupPost } = require("../controllers/signupController");
const passport = require("passport");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("index", { logged: true });
  } else {
    res.render("index", { logged: false });
  }
});

// login route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-failure",
  })
);

// logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/");
  });
});

// Sign up routes
router.get("/signup", signupGet);
router.post("/signup", signupPost);

module.exports = router;
