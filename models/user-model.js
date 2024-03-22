const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  membership: { type: String },
  is_admin:{type:Boolean},
  password: {
    type: String,
    required: true,
  },
});

userSchema.virtual("fullname").get(function () {
  return `${this.firstname + this.lastname}`;
});

module.exports = mongoose.model("User", userSchema);
