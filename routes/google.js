var express = require("express");
var passport = require("passport");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require("../models/users");
var codechefUser = require("../models/codechefmodel");
var codeforcesUser = require("../models/codeforcesmodel");
var leetcodeUser = require("../models/leetcodemodel");
var authenticate = require("../authenticate");
const { route } = require("./users");
router.use(bodyParser.json());

router.get(
  "/signin",
  passport.authenticate("google", {session:false,scope: ["profile", "email"] ,session:false})
);
router.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google/sigin",
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
);
module.exports = router;