var express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
var authenticate = require("../authenticate");
var User = require("../models/users");
const cors = require("./cors");
router.use(bodyParser.json());
router.route("/").options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router.post("/",cors.corsWithOptions, (req, res, next) => {
  User.findById(req.body.user_id)
    .then(
      (user) => {
        if (user) {
           var token = authenticate.getToken({ _id: req.body.user_id });
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({user, success: true ,token});
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
module.exports=router;