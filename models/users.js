var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema(
  {
    firstname: {
      type: String,
      default: '',
    },
    lastname: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    codechef_handle: {
      type: String,
      default: '',
    },
    codechef_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'codechefUser',
    },
    codeforces_handle: {
      type: String,
      default: '',
    },
    codeforces_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'codeforcesUser',
    },
    leetcode_handle: {
      type: String,
      default: '',
    },
    leetcode_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'leetcodeUser',
    },
    envision_handle: {
      type: String,
      unique: true,
    },
    googleId: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', User);
