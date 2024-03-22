const express = require("express");
const { signupGet, signupPost } = require("../controllers/signup-controller");
const {
  loginGet,
  loginPost,
  logOut,
} = require("../controllers/login-controller");
const { isAuth } = require("./auth");
const {
  joinClubGet,
  joinClubPost,
} = require("../controllers/join-club-controller");
const { createMessagePost } = require("../controllers/message-controller");
const router = express.Router();
const Messages = require("../models/message-model");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const messages = await Messages.find().populate("author", "username").exec();

  res.render("index", { messages: messages });
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
router.post("/join", isAuth, joinClubPost);

router.post("/send-message", isAuth, createMessagePost);
router.post("/delete-message" , (req,res,next) => {
  
})

module.exports = router;
