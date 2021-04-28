import { ICodechef } from "../models/codechefmodel";
import { ICodeforces } from "../models/codeforcesmodel";
import { ILeetcode } from "../models/leetcodemodel";
import codechefscrap from "../web-scrapping/codechef";
import codeforecesscrap from "../web-scrapping/codeforces";
import leetcodescrap from "../web-scrapping/leetcode";

const Codechefmodel = require("../models/codechefmodel");
const Codeforcesmodel = require("../models/codeforcesmodel");
const Leetcodemodel = require("../models/leetcodemodel");
export const CodechefIDfinder = async (ccuser: string) => {
	const result = await Codechefmodel.findOne({ username: ccuser }).then(
		async (codechefobj: ICodechef) => {
			if (codechefobj) {
				return codechefobj.id;
			} else {
				let tempCodechef = await codechefscrap(ccuser);
				let newCodechef = new Codechefmodel(tempCodechef);
				return await newCodechef.save().id;
			}
		}
	);
	return result;
};
export const CodeforcesIDfinder = async (ccuser: string) => {
	const result = await Codeforcesmodel.findOne({ username: ccuser }).then(
		async (codeforcesobj: ICodeforces) => {
			if (codeforcesobj) {
				return codeforcesobj.id;
			} else {
				let tempCodeforces = await codeforecesscrap(ccuser);
				let newCodeforces = new Codeforcesmodel(tempCodeforces);
				return await newCodeforces.save().id;
			}
		}
	);
	return result;
};
export const LeetcodeIDfinder = async (ccuser: string) => {
	const result = await Leetcodemodel.findOne({ username: ccuser }).then(
		async (leetcodeobj: ILeetcode) => {
			if (leetcodeobj) {
				return leetcodeobj.id;
			} else {
				let tmpLeetcode = await leetcodescrap(ccuser);
				let newLeetcode = new Leetcodemodel(tmpLeetcode);
				return await newLeetcode.save().id;
			}
		}
	);
	return result;
};

