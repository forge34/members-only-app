const express = require("express");
const { signupGet, signupPost } = require("../controllers/signup-controller");
const { loginGet, loginPost, logOut } = require("../controllers/login-controller");
const { isAuth } = require("./auth");
const { joinClubGet, joinClubPost } = require("../controllers/join-club-controller");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*  login route */
router.get("/login", loginGet);

router.post("/login", loginPost);

/*  logout route */
router.get("/logout", logOut);

/* Sign up routes */
router.get("/signup", signupGet);
router.post("/signup", signupPost);

router.get("/join", isAuth, joinClubGet);
router.post("/join" , isAuth,joinClubPost)

module.exports = router;
