const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, required: true },
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
