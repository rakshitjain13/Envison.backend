import { Request, Response } from "express";
import { IUser } from "../models/users";

var express = require("express");
import bodyParser from "body-parser";
var router = express.Router();
var User=require('../models/users');
const cors = require("./cors");
router.use(bodyParser.json());
router.route("/").options(cors.corsWithOptions, (req:Request, res:Response) => {
  res.sendStatus(200);
});
router.post("/", cors.corsWithOptions, (req: Request, res: Response) => {
	console.log(req.body);
	User.findOne({ envision_handle: req.body.envision_handle }).then((user:IUser) => {
		if (user) {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ status: false });
		} else {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ status: true });
		}
	});
});
module.exports=router;