const joinClubGet = (req, res, next) => {
  res.render("join-club");
};

const joinClubPost = (req, res, next) => {
  console.log(req.body.passcode);
  res.redirect("/");
};

module.exports = {
  joinClubPost,
  joinClubGet,
};
