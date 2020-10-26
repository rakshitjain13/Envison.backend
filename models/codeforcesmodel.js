var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var codeforcesUser = new Schema({
  username: {
    type: String,
    default: '',
  },
  rating: {
    type: String,
    default: '',
  },
  rating_stage: {
    type: String,
    default: '',
  },
  allcontests: {
    type: Array,
    unique:false,
    default: '',
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('codeforcesUser', codeforcesUser);
