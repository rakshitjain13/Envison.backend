var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var codechefUser = new Schema({
  name: {
    type: String,
    
  },
  username: {
    type: String,
   
  },
  star: {
    type: String,
   
  },
  rating: {
    type: String,
    
  },
  allcontests: {
    type: Array,
   
  },
  hightest_rating: {
    type: String,
    
  },
  global_ranking: {
    type: String,
   
  },
  country_ranking: {
    type: String,
    unique: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('codechefUser', codechefUser);
