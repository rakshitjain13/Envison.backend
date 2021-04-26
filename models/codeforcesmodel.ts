import { Schema, Document, model, Types } from "mongoose";
export interface codeforces_contest_type {
	Contest: String;
	Rank: String;
	Solved: String;
	RatingChange: String;
	NewRating: String;
}
export interface ICodeforces extends Document {
	username?: String;
	rating?: String;
	maxRating?: String;
	rank?: String;
	contests?: codeforces_contest_type[];
	status: Boolean;
}
var codeforcesUser = new Schema({
	username: {
		type: String,
		unique: true,
	},
	rating: {
		type: String,
		sparse: true,
	},
	maxRating: {
		type: String,
		sparse: true,
	},
	rank: {
		type: String,
		sparse: true,
	},
	contests: {
		type: Array,
		sparse: true,
	},
	status: {
		type: Boolean,
		default: false,
		sparse: true
	},
});
module.exports = model<ICodeforces>("codeforcesUser", codeforcesUser);
