import { IUser } from "../models/users";
import {
	CodechefIDfinder,
	CodeforcesIDfinder,
	LeetcodeIDfinder,
} from "../utils/scrapper";
import codechefscrap from "../web-scrapping/codechef";
import codeforecesscrap from "../web-scrapping/codeforces";
import leetcodescrap from "../web-scrapping/leetcode";

const User = require("../models/users");
const Codechefmodel = require("../models/codechefmodel");
const Codeforcesmodel = require("../models/codeforcesmodel");
const Leetcodemodel = require("../models/leetcodemodel");
const authenticate = require("../authenticate");
export const resolvers = {
	Query: {
		user(par: any, args: { envision_handle: string }) {
			return User.findOne({ envision_handle: args.envision_handle });
		},
		usernametest(par: any, { envision_handle }: any) {
			return User.findOne({ envision_handle })
				.then((user: IUser) => {
					if (user) return { available: false };
					else return { available: true };
				})
				.catch((err: any) => ({ available: true }));
		},
		async codecheftest(par: any, { codechef_handle }: any) {
			return await codechefscrap(codechef_handle)
				.then((res) => {
					return { available: !res.status };
				})
				.catch((err: any) => ({ available: true }));
		},
		async codeforcestest(par: any, { codeforces_handle }: any) {
			return await codeforecesscrap(codeforces_handle)
				.then((res) => {
					return { available: !res.status };
				})
				.catch((err: any) => ({ available: true }));
		},
		async leetcodetest(par: any, { leetcode_handle }: any) {
			return await leetcodescrap(leetcode_handle)
				.then((res) => {
					return { available: !res.status };
				})
				.catch((err: any) => ({ available: true }));
		},
	},
	User: {
		codechef_id(parent: { codechef_id: any }) {
			return Codechefmodel.findById(parent.codechef_id);
		},
		codeforces_id(parent: { codeforces_id: any }) {
			return Codeforcesmodel.findById(parent.codeforces_id);
		},
		leetcode_id(parent: { leetcode_id: any }) {
			return Leetcodemodel.findById(parent.leetcode_id);
		},
	},
	Mutation: {
		async signin(_: any, { id, name, email }: any) {
			const result = await User.findOne({ username: id }).then(
				(user: IUser) => {
					if (user !== null) {
						var token = authenticate.getToken({ _id: user._id });
						return { user, token, success: true };
					} else {
						user = new User({ username: id });
						user.displayname = name;
						user.email = email;
						user
							.save()
							.then((user) => {
								var token = authenticate.getToken({ _id: user._id });
								return { user, token, success: true };
							})
							.catch((err) => null);
					}
				}
			);
			return result;
		},
		async filldetails(
			_: any,
			{
				envision_handle,
				codechef_handle,
				codeforces_handle,
				leetcode_handle,
			}: any,
			{ req, res, next }: any
		) {
			if (req.userId) {
				let newUser;
				await User.findById(req.userId).then(async (user: IUser) => {
					if (user) {
						// console.log(user);
						user.envision_handle = envision_handle;
						if (codechef_handle) {
							user.codechef_handle = codechef_handle;
							user.codechef_id = await CodechefIDfinder(codechef_handle);
						}
						if (codeforces_handle) {
							user.codeforces_handle = codeforces_handle;
							user.codeforces_id = await CodeforcesIDfinder(codeforces_handle);
						}
						if (leetcode_handle) {
							user.leetcode_handle = leetcode_handle;
							user.leetcode_id = await LeetcodeIDfinder(leetcode_handle);
						}
						newUser = await user.save();
					}
				});
				return newUser;
			} else {
				return;
			}
		},
	},
};
