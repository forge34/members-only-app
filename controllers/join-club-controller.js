const expressAsyncHandler = require("express-async-handler");
const Users = require("../models/user-model");
const joinClubGet = (req, res, next) => {
  res.render("join-club");
};

const joinClubPost = expressAsyncHandler(async (req, res, next) => {
  const user = await Users.findById(res.locals.user._id).exec();

  if (req.body.passcode === "1234") {
    if (user.membership === "Club member") {
      res.render("join-club", { error: "You are already a club member" });
    } else {
      await user.updateOne({membership:"Club member"}).exec()
      res.redirect("/");
    }
  }
});

module.exports = {
  joinClubPost,
  joinClubGet,
};
