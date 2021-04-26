var express = require("express");
import bodyParser from "body-parser";
import { NextFunction,Response } from "express";
import { IUser } from "../models/users";
var router = express.Router();
var authenticate = require("../authenticate");
var User = require("../models/users");
const cors = require("./cors");
router.use(bodyParser.json());
router.route("/").options(cors.corsWithOptions, (req:Request, res:Response) => {
  res.sendStatus(200);
});
router.post(
	"/",
	cors.corsWithOptions,
	(
		req: { body: { user_id: string } },
		res: Response,
		next: NextFunction
	) => {
		User.findById(req.body.user_id)
			.then(
				(user: IUser) => {
					if (user) {
						var token = authenticate.getToken({ _id: req.body.user_id });
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.json({ user, success: true, token });
					} else {
						var err:any = new Error("User not found");
						err.status = 404;
						return next(err);
					}
				},
				(err:Error) => next(err)
			)
			.catch((err:Error) => next(err));
	}
);


module.exports=router;