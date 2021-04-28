import { ICodechef } from "../models/codechefmodel";

var codechefUser = require("../models/codechefmodel");
var codechefscrap = require("../web-scrapping/codechef");

var updatecc = async () => {
	codechefUser.find({}).then((ccuserarray: ICodechef[]) => {
		ccuserarray.forEach((ccuser) => {
			codechefscrap(ccuser.username).then((codechefobj: ICodechef) => {
				ccuser.username = codechefobj.username;
				ccuser.stars = codechefobj.stars;
				ccuser.rating = codechefobj.rating;
				ccuser.contest_ratings = codechefobj.contest_ratings;
				ccuser.highest_rating = codechefobj.highest_rating;
				ccuser.global_rank = codechefobj.global_rank;
				ccuser.country_rank = codechefobj.country_rank;
				ccuser.status = codechefobj.status;
				ccuser.save();
			});
		});
	});
};

module.exports = updatecc;
