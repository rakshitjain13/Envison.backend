import { ILeetcode } from "../models/leetcodemodel";

var leetcodeUser = require("../models/leetcodemodel");
var leetcodescrap = require("../web-scrapping/leetcode");

var updateleet = function () {
	leetcodeUser.find({}).then((lcuserarray: ILeetcode[]) => {
		lcuserarray.forEach((lcuser) => {
			leetcodescrap(lcuser.username).then((leetcodeobj: ILeetcode) => {
				lcuser.username = leetcodeobj.username;
				lcuser.ranking = leetcodeobj.ranking;
				lcuser.total_problems_solved = leetcodeobj.total_problems_solved;
				lcuser.acceptanceRate = leetcodeobj.acceptanceRate;
				lcuser.easy_questions_solved = leetcodeobj.easy_questions_solved;
				lcuser.medium_questions_solved = leetcodeobj.medium_questions_solved;
				lcuser.hard_questions_solved = leetcodeobj.hard_questions_solved;
				lcuser.contribution_points = leetcodeobj.contribution_points;
				lcuser.reputation = leetcodeobj.reputation;
				lcuser.status = leetcodeobj.status;
				lcuser.save();
			});
		});
	});
};

module.exports = updateleet;
