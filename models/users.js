var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
  displayname: {
    type: String,
    default: "",
  },
  envision_handle: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    unique: true,
  },
  codechef_handle: {
    type: String,
    default: "",
  },
  codechef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "codechefUser",
  },
  codeforces_handle: {
    type: String,
    default: "",
  },
  codeforces_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "codeforcesUser",
  },
  atcoder_handle: {
    type: String,
    default: "",
  },
  atcoder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "atcoderUser",
  },
  username: {
    type: String,
    unique: true,
  },
});
module.exports = mongoose.model("User", User);
