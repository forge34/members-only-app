const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  membership: { type: String },
  password: {
    type: String,
    required: true,
  },
  messages: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
});

userSchema.virtual("fullname").get(function () {
  return `${this.firstname + this.lastname}`;
});

module.exports = mongoose.model("User", userSchema);
