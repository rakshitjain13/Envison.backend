var leetcodeUser = require('../models/leetcodemodel');
var leetcodescrap = require('../web-scrapping/codeforces');

var updateleet = function () {
  leetcodeUser.find({}).then((lcuserarray) => {
    lcuserarray.forEach((lcuser) => {
      leetcodescrap(lcuser.username).then((leetcodeobj) => {
        if (leetcodeobj.success) {
          lcuser.name = leetcodeobj.name;
          lcuser.finishedContests = leetcodeobj.finishedContests;
          lcuser.solvedQuestions = leetcodeobj.solvedQuestions;
          lcuser.acceptedSubmissions = leetcodeobj.acceptedSubmissions;
          lcuser.acceptanceRate = leetcodeobj.acceptanceRate;
          lcuser.submissionsInLastYear = leetcodeobj.submissionsInLastYear;
          lcuser.recentSubmission = leetcodeobj.recentSubmission;
          lcuser.success = leetcodeobj.success;
          console.log(leetcodeobj);
          lcuser.save();
        } else {
          lcuser.success = leetcodeobj.success;
          console.log(lcuser);
          lcuser.save();
        }
      });
    });
  });
};

module.exports = updateleet;
