import { NextFunction, Request, Response } from "express";
import {
	codechefusertest,
	codeforcesusertest,
  leetcodeusertest,
} from "../web-scrapping/usertest";

var express = require("express");
var passport = require("passport");
import bodyParser from "body-parser";
var router = express.Router();
var cors=require('./cors');
router.use(bodyParser.json());
router.route("/codechef").options(cors.corsWithOptions, (req:Request, res:Response) => {
  res.sendStatus(200);
});
router.route("/codeforces").options(cors.corsWithOptions, (req:Request, res:Response) => {
  res.sendStatus(200);
});
router.route("/atcoder").options(cors.corsWithOptions, (req:Request, res:Response) => {
  res.sendStatus(200);
});
router.post("/codechef",cors.corsWithOptions,async (req:Request,res:Response,next:NextFunction)=>{
    var resultcodechef = await codechefusertest(
      req.body.codechef_handle
    );
   
    res.statusCode=200;
    res.setHeader("Content-Type", "application/json");
    res.json({status:resultcodechef.status});

});
router.post("/codeforces",cors.corsWithOptions,async (req:Request,res:Response,next:NextFunction)=>{
   var result = await codeforcesusertest(req.body.codeforces_handle);
   res.statusCode = 200;
   res.setHeader("Content-Type", "application/json");
   res.json({status:result.status});

});
router.post("/leetcode", cors.corsWithOptions, async (req:Request,res:Response,next:NextFunction) => {
   var result = await leetcodeusertest(req.body.leetcode_handle);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ status: result.status });
});
module.exports=router;