const express = require("express");
const { signupGet, signupPost } = require("../controllers/signup-controller");
const { loginGet, loginPost } = require("../controllers/login-controller");
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
router.get("/login", loginGet);

router.post("/login",loginPost);

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
