var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var codeforcesUser = new Schema({
  name: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  rating: {
    type: String,
    default: "",
  },
  rating_stage: {
    type: String,
    default: "",
  },
  allcontests: {
    type: Array,
    unique: true,
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('codeforcesUser', codeforcesUser);
