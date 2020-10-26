var express = require('express');
var passport = require('passport');
const bodyParser = require('body-parser');
var router = express.Router();
var User = require('../models/users');
var codechefUser = require('../models/codechefmodel');
var codeforcesUser = require('../models/codeforcesmodel');
var leetcodeUser = require('../models/leetcodemodel');
var authenticate = require('../authenticate');
var codechefscrapper = require('../web-scrapping/codechef');
var codeforcesscrapper = require('../web-scrapping/codeforces');
var leetcodescrapper = require('../web-scrapping/leetcode');
const cors = require("./cors");
const atcoderUser = require('../models/atcodermodel');
const atcoderscrap = require('../web-scrapping/atcoder');
router.use(bodyParser.json());

/* GET users listing. */
router.route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  });
  router.route("/filldetails")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  });
router.get('/', cors.cors,function (req, res, next) {
  res.send('respond with a resource');
});
router.get("/:envision_handle", cors.cors, (req, res, next) => {
  User.find({ envision_handle: req.params.envision_handle })
    .populate("codechef_id")
    .populate("codeforces_id")
    .populate("leetcode_id")
    .populate("atcoder_id")
    .then(
      (user) => {
        if (user) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(user);
        } else {
          err = new Error("User not found");
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
router.post(
  "/filldetails",
  cors.corsWithOptions,
  authenticate.verifyUser,
  (req, res, next) => {
    User.findById(req.user._id)
      .then(
        (user) => {
          if (user != null ) {
            user.envision_handle = req.body.envision_handle;
            user.codechef_handle =
              req.body.codechef_handle != null ? req.body.codechef_handle : "";
            user.codeforces_handle =
              req.body.codeforces_handle != null
                ? req.body.codeforces_handle
                : "";
            user.leetcode_handle =
              req.body.leetcode_handle != null ? req.body.leetcode_handle : "";
            user.atcoder_handle =
                req.body.atcoder_handle != null
                  ? req.body.atcoder_handle
                  : "";
            if (req.body.codechef_handle != null) {
              const codechefuser = new codechefUser();
              codechefuser.username = req.body.codechef_handle;
              user.codechef_id = codechefuser._id;
              codechefscrapper(req.body.codechef_handle).then((codechefobj) => {
                if (codechefobj.success) {
                  codechefuser.name = codechefobj.name;
                  codechefuser.star = codechefobj.star;
                  codechefuser.rating = codechefobj.rating;
                  codechefuser.allcontests = codechefobj.allcontests;
                  codechefuser.highest_rating = codechefobj.highest_rating;
                  codechefuser.global_ranking = codechefobj.global_ranking;
                  codechefuser.country_ranking = codechefobj.country_ranking;
                  codechefuser.success = codechefobj.success;
                } else {
                  codechefuser.success = false;
                }
                codechefuser.save().then((obj) => console.log(obj));
              });
            }
            if (req.body.codeforces_handle != null) {
              const codeforcesuser = new codeforcesUser();
              codeforcesuser.username = req.body.codeforces_handle;
              user.codeforces_id = codeforcesuser._id;
              codeforcesscrapper(req.body.codeforces_handle).then(
                (codeforcesobj) => {
                  if (codeforcesobj.success) {
                    codeforcesuser.rating = codeforcesobj.rating;
                    codeforcesuser.rating_stage = codeforcesobj.rating_stage;
                    codeforcesuser.allcontests = codeforcesobj.allcontests;
                    codeforcesuser.success = true;
                  } else {
                    codeforcesuser.success = false;
                  }
                  codeforcesuser.save().then((obj) => console.log(obj));
                }
              );
            }
            if (req.body.leetcode_handle != null) {
              const leetcodeuser = new leetcodeUser();
              leetcodeuser.username = req.body.leetcode_handle;
              user.leetcode_id = leetcodeuser._id;
              leetcodescrapper(req.body.leetcode_handle).then((leetcodeobj) => {
                if (leetcodeobj.success) {
                  leetcodeuser.name = leetcodeobj.name;
                  leetcodeuser.finishedContests = leetcodeobj.finishedContests;
                  leetcodeuser.solvedQuestions = leetcodeobj.solvedQuestions;
                  leetcodeuser.acceptedSubmissions =
                    leetcodeobj.acceptedSubmissions;
                  leetcodeuser.acceptanceRate = leetcodeobj.acceptanceRate;
                  leetcodeuser.submissionsInLastYear =
                    leetcodeobj.submissionsInLastYear;
                  leetcodeuser.recentSubmission = leetcodeobj.recentSubmission;
                  leetcodeuser.success = leetcodeobj.success;
                } else {
                  leetcodeuser.success = leetcodeobj.success;
                }
                leetcodeuser.save().then((obj) => console.log(obj));
              });
            }
             if (req.body.atcoder_handle != null) {
               const atcoderuser = new atcoderUser();
               atcoderuser.name = req.body.leetcode_handle;
               user.atcoder_id = atcoderuser._id;
               atcoderscrap(req.body.atcoder_handle).then(
                 (atcoderObj) => {
                   if (atcoderObj.success) {
                     atcoderuser.name = atcoderObj.name;
                     atcoderuser.recentSubmission =
                       atcoderObj.recentSubmission;
                       atcoderuser.data=atcoderObj.data;
                     atcoderuser.success = atcoderObj.success;
                   } else {
                      atcoderuser.success = atcoderObj.success;
                   }
                   atcoderuser.save().then((obj) => console.log(obj));
                 }
               );
             }
            user.save().then((updated_user) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(updated_user);
            });
          } else {
            err = new Error("User not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

module.exports = router;
