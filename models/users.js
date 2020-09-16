var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({

  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  codechef_handle: {
    type: String,
    default: "",
  },
  codeforces_handle: {
    type: String,
    default: "",
  },
  leetcode_handle: {
    type: String,
    default: "",
  },
  envision_handle:{
    type:String,
    unique:true,
  },
  googleId: String,
});
module.exports = mongoose.model("User", User);
