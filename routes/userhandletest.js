var express = require("express");
var passport = require("passport");
const bodyParser = require("body-parser");
var router = express.Router();
var usertest=require('../web-scrapping/usertest');
const cors = require("./cors");
router.use(bodyParser.json());
router.route("/codechef").options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router.route("/codeforces").options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router.route("/leetcode").options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});
router.post("/codechef",cors.corsWithOptions,async (req,res,next)=>{
    var resultcodechef = await usertest.codechefusertest(
      req.body.codechef_handle
    );
   
    res.statusCode=200;
    res.setHeader("Content-Type", "application/json");
    res.json({success:resultcodechef.success});

});
router.post("/codeforces",cors.corsWithOptions,async (req,res,next)=>{
   var result = await usertest.codeforcesusertest(req.body.codeforces_handle);
   res.statusCode = 200;
   res.setHeader("Content-Type", "application/json");
   res.json({success:result.success});

});
router.post("/leetcode", cors.corsWithOptions, async (req, res, next) => {
   var result = await usertest.leetcodeusertest(req.body.leetcode_handle);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: result.success });
});
module.exports=router;