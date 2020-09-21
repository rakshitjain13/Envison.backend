var codechefUser = require('../models/codechefmodel');
var codechefscrap = require('../web-scrapping/codechef');

var updatecc = async () => {
  codechefUser.find({}).then((ccuserarray) => {
    ccuserarray.forEach((ccuser) => {
      codechefscrap(ccuser.username).then((codechefobj) => {
        if (codechefobj.success) {
          ccuser.name = codechefobj.name;
          ccuser.star = codechefobj.star;
          ccuser.rating = codechefobj.rating;
          ccuser.allcontests = codechefobj.allcontests;
          ccuser.highest_rating = codechefobj.highest_rating;
          ccuser.global_ranking = codechefobj.global_ranking;
          ccuser.country_ranking = codechefobj.country_ranking;
          ccuser.success = codechefobj.success;
          console.log(ccuser);
          ccuser.save();
        } else {
          ccuser.success = codechefobj.success;
          console.log(ccuser);
          ccuser.save();
        }
      });
    });
  });
};

module.exports = updatecc;
