const { body, validationResult } = require("express-validator");
const Messages = require("../models/message-model");
const expressAsyncHandler = require("express-async-handler");


const createMessage = expressAsyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const message = new Messages({
      text: req.body.message,
      author: res.locals.user._id,
    });

    await message.save()
    res.redirect("/")
  }else {
    console.log(errors)
    res.redirect("/")
  }
});

const createMessagePost = [
  body("message").trim().notEmpty().escape(),
  createMessage,
];

module.exports = {
  createMessagePost,
};
