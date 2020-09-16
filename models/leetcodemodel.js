var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var leetcodeUser = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    default: "",
  },
  finishedContests: {
    type: String,
    default: "",
  },
  solvedQuestions: {
    type: String,
    default: "",
  },
  acceptedSubmissions: {
    type: String,
    default: "",
  },
  acceptanceRate: {
    type: String,
    default: "",
  },
  submissionsInLastYear: {
    type: String,
    default: "",
  },
  recentSubmission: {
    type: String,
    default: "",
  },
  global_ranking: {
    type: String,
    default: "",
  },
  country_ranking: {
    type: String,
    unique: true,
  },
  success: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('leetcodeUser', leetcodeUser);
