var express = require('express');
var passport = require("passport");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require("../models/users");
var codechefUser = require("../models/codechefmodel");
var codeforcesUser = require("../models/codeforcesmodel");
var leetcodeUser = require("../models/leetcodemodel");
var authenticate = require("../authenticate");
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
route.get('/:envision_handle',(req,res,next)=>{
  User.find({envision_handle:req.params.envision_handle})
  .populate("codechef_id")
  .populate("codeforces_id")
  .populate("leetcode_id")
  .then((user)=>{
      if(user){
      res.statusCode=200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
      }else{
         err = new Error("User not found");
         err.status = 404;
         return next(err);
      }
  },((err)=>next(err)))
  .catch((err)=>next(err))
})
router.post("/filldetails", authenticate.verifyUser, (req, res, next) => {
  User.findById(req.user._id)
    .then(
      (user) => {
        if (user != null && user.envision_handle==null) {
          user.envision_handle = req.body.envision_handle;
          user.codechef_handle =req.body.codechef_handle != null ? req.body.codechef_handle : "";
          user.codeforces_handle =req.body.codeforces_handle != null ? req.body.codeforces_handle : "";
          user.leetcode_handle =req.body.leetcode_handle != null ? req.body.leetcode_handle : "";
          if (req.body.codechef_handle != null) {
            const codechefuser= new codechefUser();
            codechefuser.username = req.body.codechef_handle;
            user.codechef_id = codechefuser._id;
            codechefuser.save()
          }
          if (req.body.codeforces_handle != null) {
             const codeforcesuser = new codeforcesUser();
             codeforcesuser.username = req.body.codeforces_handle;
             user.codeforces_id = codeforcesuser._id;
             codeforcesuser.save();
          }
          if (req.body.leetcode_handle != null) {
              const leetcodeuser = new leetcodeUser();
              leetcodeuser.username = req.body.leetcode_handle;
              user.leetcode_id = leetcodeuser._id;
              leetcodeuser.save();
          }
          user.save().then((updated_user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(updated_user);
          });
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
