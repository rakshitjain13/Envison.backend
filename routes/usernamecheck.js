var express = require("express");
var passport = require("passport");
const bodyParser = require("body-parser");
var router = express.Router();
var User=require('../models/users');
var usertest = require("../web-scrapping/usertest");
const cors = require("./cors");
router.use(bodyParser.json());
router.route("/").options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router.post("/",cors.corsWithOptions, (req, res) => {
    console.log(req.body);
  User.findOne({ envision_handle: req.body.envision_handle }).then((user) => {
    if (user) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: false });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ success: true });
    }
  });
});
module.exports=router;