const puppeteer = require('puppeteer');
var codechefUser = require('./models/codechefmodel');
var codeforcesUser = require('./models/codeforcesmodel');
var leetcodeUser = require('./models/leetcodemodel');

var User = require('./models/users');

var stopstalkscrap = require('./web-scrapping/AllContests'); //array
var codechefscrap = require('./web-scrapping/codechef'); //function
var codeforcesscrap = require('./web-scrapping/codeforces'); //function
var leetcodescrap = require('./web-scrapping/leetcode'); //function

var scrapmain = () => {
  var updatecc = function () {
    User.find({}, (userfound) => {
      if (userfound.codechef_handle != '') {
        codechefobj = codechefscrap();
        codechefUser.find({ user: userfound._id }, (err, foundccuser) => {
          if (err) {
            console.log(err);
          } else {
            if (codechefobj.name) foundccuser.name = codechefobj.name;
            if (codechefobj.username)
              foundccuser.username = codechefobj.username;
            if (codechefobj.star) foundccuser.star = codechefobj.star;
            if (codechefobj.rating) foundccuser.rating = codechefobj.rating;
            if (codechefobj.all_rating)
              foundccuser.all_rating = codechefobj.all_rating;
            if (codechefobj.highest_rating)
              foundccuser.highest_rating = codechefobj.highest_rating;
            if (codechefobj.global_ranking)
              foundccuser.global_ranking = codechefobj.global_ranking;
            if (codechefobj.country_ranking)
              foundccuser.country_ranking = codechefobj.country_ranking;
          }
        });
      }
    });
  };

  setInterval(updatecc, 1800000);

  //   var updatecf = function () {
  //     User.find({}, (userfound) => {
  //       if (userfound.codeforces_handle != '') {
  //         codeforcesobj = codeforcesscrap();
  //         codechefUser.find({ user: userfound._id }, (err, foundccuser) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             foundccuser.name = codechefobj.name;
  //             foundccuser.username = codechefobj.username;
  //             foundccuser.star = codechefobj.star;
  //             foundccuser.rating = codechefobj.rating;
  //             foundccuser.all_rating = codechefobj.all_rating;
  //             foundccuser.highest_rating = codechefobj.highest_rating;
  //             foundccuser.global_ranking = codechefobj.global_ranking;
  //             foundccuser.country_ranking = codechefobj.country_ranking;
  //           }
  //         });
  //       }
  //     });
  //   };

  //   setInterval(updatecc, 1800000);

  var updateleet = function () {
    User.find({}, (userfound) => {
      if (userfound.leetcode_handle != '') {
        leetcodeobj = leetcodescrap();
        leetcodeUser.find({ user: userfound._id }, (err, foundlcuser) => {
          if (err) {
            console.log(err);
          } else {
            if (leetcodeobj.name) foundccuser.name = codechefobj.name;
            if (codechefobj.username)
              foundccuser.username = codechefobj.username;
            if (leetcodeobj.star) foundccuser.star = codechefobj.star;
            if (leetcodeobj.rating) foundccuser.rating = codechefobj.rating;
            if (leetcodeobj.all_rating)
              foundccuser.all_rating = codechefobj.all_rating;
            if (leetcodeobj.highest_rating)
              foundccuser.highest_rating = codechefobj.highest_rating;
            if (leetcodeobj.global_ranking)
              foundccuser.global_ranking = codechefobj.global_ranking;
            if (leetcodeobj.country_ranking)
              foundccuser.country_ranking = codechefobj.country_ranking;
          }
        });
      }
    });
  };
};

module.exports = scrapmain;
