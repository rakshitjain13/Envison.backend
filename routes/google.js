var express = require("express");
var passport=require("passport");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require("../models/users");
var authenticate = require("../authenticate");
const { route } = require("./users");
const cors = require("./cors");
router.use(bodyParser.json());
const url = require("url");

router.route("/signin").options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
// router.route("/callback").options(cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200);
// });

  router.post("/signin", cors.corsWithOptions, (req, res, next) => {
    var profile = req.body.profileObj;
    console.log(profile);
    User.findOne({ googleId: profile.id }).then((user) => {
      if (user !== null) {
        var token = authenticate.getToken({ _id: user._id });
        res.statusCode=200;
         res.setHeader("Content-Type", "application/json");
         res.json({user,token,success:true});
      } else {
        user = new User();
        user.googleId=profile.id;
        user.displayname = profile.name;
        user.email = profile.email;
        user
          .save(user)
          .then((user) => {
            var token = authenticate.getToken({ _id: user._id });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({user, token,success:true});
          })
          .catch((err) => next(err));
      }
    }).catch((err)=>next(err))
  });
// router.get(
//   "/signin",
//   cors.cors,
//   passport.authenticate("google", {session:false,scope: ["profile", "email"]})
// );
// router.get(
//   "/callback",
//   cors.cors,
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "/google/sigin",
//   }),
//   (req, res) => {
//     if (req.user) {
//       // if (req.user.envision_handle) {
//       //   var token = authenticate.getToken({ _id: req.user._id });
//       //   res.statusCode = 200;
//       //   res.setHeader("Content-Type", "application/json");
//       //   res.json({
//       //     success: true,
//       //     token: token,
//       //     status: "You are successfully logged in!",
//       //   });
//       // } else {
//       //   var string = encodeURIComponent(JSON.stringify(req.user));
//       //   res.redirect("http://localhost:5000/test/?user=" + string);
//       //   res.end();
//       // }

//       // res.setHeader("Content-Type", "application/json");
//       // res.json({
//       //   success: true,
//       //   user_id: req.user._id,
//       //   status: "You are successfully logged in!",
//       // });
//       // var string = encodeURIComponent(JSON.stringify(req.user.));

//       // res.redirect("http://localhost:3000/loginload/");
//       // res.end();
//       res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(req.user);
//     }
//   }
// );
module.exports = router;