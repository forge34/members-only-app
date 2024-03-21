const { DateTime } = require("luxon");
const User = require("../models/user-model")
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

messageSchema.virtual("time_sent").get(function (){
    return DateTime.fromJSDate(this.time).toLocaleString(DateTime.DATETIME_SHORT)
})

module.exports = mongoose.model("Message", messageSchema);
