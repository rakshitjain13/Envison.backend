var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var atcoderUser = new Schema({
  name: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: "",
  },
  recentSubmission: {
    type: Array,
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("atcoderUser", atcoderUser);
