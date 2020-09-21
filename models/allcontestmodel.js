var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var currcontests = new Schema({
  currcontests: {
    type: Array,
    default: '',
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('currcontests', currcontests);
