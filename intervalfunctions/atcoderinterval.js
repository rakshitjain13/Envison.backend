var atcoderUser = require("../models/atcodermodel");
var atcoderscrap = require("../web-scrapping/atcoder");

var updateatcoder = function () {
  atcoderUser.find({}).then((lcuserarray) => {
    lcuserarray.forEach((lcuser) => {
      atcoderscrap(lcuser.name).then((atcoderobj) => {
        if (atcoderobj.success) {
          lcuser.name = atcoderobj.name;
          lcuser.recentSubmission = atcoderobj.recentSubmission;
          lcuser.success = atcoderobj.success;
          lcuser.data = atcoderobj.data;
          lcuser.save();
        } else {
          lcuser.success = leetcodeobj.success;
          lcuser.save();
        }
      });
    });
  });
};

module.exports = updateatcoder;
