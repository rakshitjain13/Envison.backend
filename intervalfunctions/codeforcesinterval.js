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
          cfuser.success = true;
          cfuser
            .save()
            .then((user) => console.log(user))
            .catch((err) => console.log(err));
        } else {
          cfuser.success = false;
          cfuser
            .save()
            .then((user) => console.log(user))
            .catch((err) => console.log(err));
        }
      });
    });
  });
};

module.exports = updatecf;
