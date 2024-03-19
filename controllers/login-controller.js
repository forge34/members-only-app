const passport = require("passport");

function loginGet(req,res,next) {
  res.render("login");
}


const loginPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-failure",
})

module.exports = {
  loginGet,
  loginPost,
};
