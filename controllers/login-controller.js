const passport = require("passport");

function loginGet(req,res,next) {
  res.render("login");
}


const loginPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-failure",
})

const logOut = (req, res, next) => {
  req.logout((err) => {
    res.redirect("/");
  });
}

module.exports = {
  loginGet,
  loginPost,
  logOut,
};
