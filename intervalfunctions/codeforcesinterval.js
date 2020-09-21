var codeforcesUser = require('../models/codeforcesmodel');
var codeforcesscrap = require('../web-scrapping/codeforces');

var updatecf = function () {
  codeforcesUser.find({}).then((cfuserarray) => {
    cfuserarray.forEach((cfuser) => {
      codeforcesscrap(cfuser.username).then((codeforcesobj) => {
        if (codeforcesobj.success) {
          cfuser.rating = codeforcesobj.rating;
          cfuser.rating_stage = codeforcesobj.rating_stage;
          cfuser.allcontests = codeforcesobj.allcontests;
          cfuser.success = codeforcesobj.success;
          console.log(cfuser);
          cfuser.save();
        } else {
          cfuser.success = codeforcesobj.success;
          console.log(cfuser);
          cfuser.save();
        }
      });
    });
  });
};

module.exports = updatecf;