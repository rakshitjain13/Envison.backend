var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var leetcodeUser = new Schema({
  name: {
    type: String,
    default: '',
  },
  finishedContests: {
    type: String,
    default: '',
  },
  solvedQuestions: {
    type: String,
    default: '',
  },
  acceptedSubmissions: {
    type: String,
    default: '',
  },
  acceptanceRate: {
    type: String,
    default: '',
  },
  submissionsInLastYear: {
    type: String,
    default: '',
  },
  recentSubmission: {
    type: Array,
    default: '',
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('leetcodeUser', leetcodeUser);
