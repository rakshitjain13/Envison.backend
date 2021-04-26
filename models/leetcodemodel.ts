import { Schema, Document, model, Types } from "mongoose";
export interface ILeetcode extends Document {
	username?:String;
	ranking?: String;
	total_problems_solved?: String;
	acceptanceRate?: String;
	easy_questions_solved?: String;
	medium_questions_solved?: String;
	hard_questions_solved?: String;
	contribution_points?: String;
	reputation?: String;
	status:Boolean;
}
var leetcodeUser = new Schema({
	username: {
		type: String,
		unique: true
	},
	ranking: {
		type: String,
		sparse: true,
	},
	total_problems_solved: {
		type: String,
		sparse: true,
	},
	acceptanceRate: {
		type: String,
		sparse: true,
	},
	easy_questions_solved: {
		type: String,
		sparse: true,
	},
	medium_questions_solved: {
		type: String,
		sparse: true,
	},
	hard_questions_solved: {
		type: String,
		sparse: true,
	},
	contribution_points: {
		type: String,
		sparse: true,
	},
	reputation: {
		type: String,
		sparse: true,
	},
	status: {
		type: Boolean,
		default: false,
		sparse: true,
	},
});
module.exports = model<ILeetcode>("leetcodeUser", leetcodeUser);
