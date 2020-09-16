var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var codechefUser = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  star: {
    type: String,
    default: '',
  },
  rating: {
    type: String,
    default: '',
  },
  all_rating: {
    type: String,
    default: '',
  },
  hightest_rating: {
    type: String,
    default: '',
  },
  global_ranking: {
    type: String,
    default: '',
  },
  country_ranking: {
    type: String,
    unique: true,
  },
  success:{
    type:Boolean,
    default:false
  }
});
module.exports = mongoose.model('codechefUser', codechefUser);
