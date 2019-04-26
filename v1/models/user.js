var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");

var userschema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: {type:String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default:false}
});

userschema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userschema);