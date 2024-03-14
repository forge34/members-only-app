const express = require("express");
const { signupGet, signupPost } = require("../controllers/signupController");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login" , (req,res) => {
  res.render("login" )
})


// Sign up routes
router.get("/signup" , signupGet)
router.post("/signup" , signupPost)

module.exports = router;
