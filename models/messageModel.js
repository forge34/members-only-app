const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title:{type:String,required:true},
    text:{type:String,required:true},
    time:{type},
    author: {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Message" , messageSchema)