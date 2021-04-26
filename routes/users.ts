var express = require("express");
var passport = require("passport");
import bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";
import { ICodechef } from "../models/codechefmodel";
import { ICodeforces } from "../models/codeforcesmodel";
import { ILeetcode } from "../models/leetcodemodel";
import { IUser } from "../models/users";
import codechefscrap from "../web-scrapping/codechef";
import codeforecesscrap from "../web-scrapping/codeforces";
import leetcodescrap from "../web-scrapping/leetcode";
var router = express.Router();
var User = require("../models/users");
var codechefUser = require("../models/codechefmodel");
var codeforcesUser = require("../models/codeforcesmodel");
var leetcodeUser = require("../models/leetcodemodel");
var authenticate = require("../authenticate");
const cors = require("./cors");
router.use(bodyParser.json());

/* GET users listing. */
router
	.route("/")
	.options(cors.corsWithOptions, (req: Request, res: Response) => {
		res.sendStatus(200);
	});
router
	.route("/filldetails")
	.options(cors.corsWithOptions, (req: Request, res: Response) => {
		res.sendStatus(200);
	});
router.get(
	"/",
	cors.cors,
	function (req: Request, res: Response, next: NextFunction) {
		res.send("respond with a resource");
	}
);
router.get(
	"/:envision_handle",
	cors.cors,
	(req: Request, res: Response, next: NextFunction) => {
		User.findOne({ envision_handle: req.params.envision_handle })
			.populate("codechef_id")
			.populate("codeforces_id")
			.populate("leetcode_id")
			.then(
				(user: IUser & { status: boolean }) => {
					if (user) {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						user.status = true;
						res.json(user);
					} else {
						res.json({ status: false });
					}
				},
				(err: Error) => next(err)
			)
			.catch((err: Error) => next(err));
	}
);
router.post(
	"/filldetails",
	cors.corsWithOptions,
	authenticate.verifyUser,
	(req: { user: IUser; body: IUser }, res: Response, next: NextFunction) => {
		User.findById(req.user._id)
			.then(
				async (user: IUser) => {
					if (user != null) {
						user.envision_handle = req.body.envision_handle;
						user.codechef_handle =
							req.body.codechef_handle != null ? req.body.codechef_handle : "";
						user.codeforces_handle =
							req.body.codeforces_handle != null
								? req.body.codeforces_handle
								: "";
						user.leetcode_handle =
							req.body.leetcode_handle != null ? req.body.leetcode_handle : "";
						const CodechefWork = async () => {
							if (req.body.codechef_handle != null) {
								// codechefUser
								// 	.findOne({ username: req.body.codechef_handle })
								// 	.then(async (codechefuserexist: ICodechef) => {
								// 		if (codechefuserexist) {
								// 			user.codechef_id = codechefuserexist._id;
								// 			// console.log(codechefuserexist, user);
								// 		} else {
											const codechefuser: ICodechef = new codechefUser();
											codechefuser.username = req.body.codechef_handle;
											user.codechef_id = codechefuser._id;
											await codechefscrap(
												String(req.body.codechef_handle)
											).then((codechefobj) => {
												if (codechefobj.status) {
													codechefuser.username = codechefobj.username;
													codechefuser.rating = codechefobj.rating;
													codechefuser.stars = codechefobj.stars;
													codechefuser.contest_ratings =
														codechefobj.contest_ratings;
													codechefuser.highest_rating =
														codechefobj.highest_rating;
													codechefuser.global_rank = codechefobj.global_rank;
													codechefuser.country_rank = codechefobj.country_rank;
													codechefuser.status = true;
												} else {
													codechefuser.status = false;
												}
												codechefuser.save().then((obj) => console.log(obj));
											});
									// 	}
									// })
									// .catch((err: Error) => next(err));
							}
						};
						const CodeforcesWork = async () => {
							if (req.body.codeforces_handle != null) {
								const codeforcesuser = new codeforcesUser();
								codeforcesuser.username = req.body.codeforces_handle;
								user.codeforces_id = codeforcesuser._id;
								await codeforecesscrap(String(req.body.codeforces_handle)).then(
									(codeforcesobj) => {
										if (codeforcesobj.status) {
											codeforcesuser.username = codeforcesobj.username;
											codeforcesuser.rating = codeforcesobj.rating;
											codeforcesuser.maxRating = codeforcesobj.maxRating;
											codeforcesuser.rank = codeforcesobj.rank;
											codeforcesuser.contests = codeforcesobj.contests;
											codeforcesuser.status = true;
										} else {
											codeforcesuser.status = false;
										}
										codeforcesuser
											.save()
											.then((obj: ICodeforces) => console.log(obj));
									}
								);
							}
						};
						const LeetcodeWork = async () => {
							if (req.body.leetcode_handle != null) {
								const leetcodeuser = new leetcodeUser();
								leetcodeuser.username = req.body.leetcode_handle;
								user.leetcode_id = leetcodeuser._id;
								leetcodescrap(String(req.body.leetcode_handle)).then(
									(leetcodeobj) => {
										if (leetcodeobj.status) {
											leetcodeuser.username = leetcodeobj.username;
											leetcodeuser.ranking = leetcodeobj.ranking;
											leetcodeuser.total_problems_solved =
												leetcodeobj.total_problems_solved;
											leetcodeuser.acceptanceRate = leetcodeobj.acceptanceRate;
											leetcodeuser.easy_questions_solved =
												leetcodeobj.easy_questions_solved;
											leetcodeuser.medium_questions_solved =
												leetcodeobj.medium_questions_solved;
											leetcodeuser.hard_questions_solved =
												leetcodeobj.hard_questions_solved;
											leetcodeuser.contribution_points =
												leetcodeobj.contribution_points;
											leetcodeuser.reputation = leetcodeobj.reputation;
											leetcodeuser.status = true;
										} else {
											leetcodeuser.status = false;
										}
										leetcodeuser
											.save()
											.then((obj: ILeetcode) => console.log(obj));
									}
								);
							}
						};
						Promise.all([
							CodechefWork(),
							CodeforcesWork(),
							LeetcodeWork(),
						]).then((values) => {
							console.log(values);
						});
						user.save().then((updated_user) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(updated_user);
						});
					} else {
						let err: any = new Error("User not found");
						err.status = 404;
						return next(err);
					}
				},
				(err: Error) => next(err)
			)
			.catch((err: Error) => next(err));
	}
);

module.exports = router;
