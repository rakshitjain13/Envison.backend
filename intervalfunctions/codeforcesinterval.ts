var codeforcesUser = require('../models/codeforcesmodel');
var codeforcesscrap = require('../web-scrapping/codeforces');
import { ICodeforces } from "../models/codeforcesmodel";
var updatecf = function () {
  codeforcesUser.find({}).then((cfuserarray: ICodeforces[]) => {
		cfuserarray.forEach((cfuser) => {
			codeforcesscrap(cfuser.username).then((codeforcesobj: ICodeforces) => {
					cfuser.username = codeforcesobj.username;
          cfuser.rating = codeforcesobj.rating;
					cfuser.maxRating = codeforcesobj.maxRating;
					cfuser.rank = codeforcesobj.rank;
					cfuser.contests = codeforcesobj.contests;
					cfuser.status = codeforcesobj.status;
					cfuser.save();
			});
		});
	});
};

module.exports = updatecf;
