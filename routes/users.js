var express = require('express');
var passport = require("passport");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require("../models/users");
var authenticate = require("../authenticate");
const { route } = require(".");
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post(
  "/google/token",
  passport.authenticate("googleToken", {
    session: false,
  }),
  (req, res) => {
    if (req.user) {
      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        token: token,
        status: "You are successfully logged in!",
      });
    }
  }
)
.post("/filldetails", authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
    .then(
      (user) => {
        if (user != null) {
          user.envision_handle = req.body.envision_handle;
          user.codechef_handle =req.body.codechef_handle != null ? req.body.codechef_handle : "";
          user.codeforces_handle =req.body.codeforces_handle != null ? req.body.codeforces_handle : "";
          user.leetcode_handle =req.body.leetcode_handle != null ? req.body.leetcode_handle : "";
          user.save()
            .then(
              (updated_user) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(updated_user);
              }
            )
        }else{
         err = new Error("User not found");
         err.status = 404;
         return next(err);

        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err))
});

module.exports = router;
