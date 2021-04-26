import { Schema, Document, model, Types } from "mongoose";
import { ICodechef } from "./codechefmodel";
import { ICodeforces } from "./codeforcesmodel";
import { ILeetcode } from "./leetcodemodel";
export interface IUser extends Document {
	displayname: String;
	envision_handle: String;
	email: String;
	codechef_handle?: String;
	codechef_id?: ICodechef['_id'];
	codeforces_handle?: String;
	codeforces_id?: ICodeforces['_id'];
	leetcode_handle?: String;
	leetcode_id?: ILeetcode['_id'];
	username: String;
}
var User = new Schema({
	username: {
		type: String,
		unique: true,
	},
	displayname: {
		type: String,
		default: "",
		sparse: true,
	},
	envision_handle: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	codechef_handle: {
		type: String,
		default: "",
		sparse: true,
	},
	codechef_id: {
		type: Schema.Types.ObjectId,
		ref: "codechefUser",
		sparse: true,
	},
	codeforces_handle: {
		type: String,
		default: "",
		sparse: true,
	},
	codeforces_id: {
		type: Schema.Types.ObjectId,
		ref: "codeforcesUser",
		sparse: true,
	},
	leetcode_handle: {
		type: String,
		default: "",
		sparse: true,
	},
	leetcode_id: {
		type: Schema.Types.ObjectId,
		ref: "leetcodeUser",
		sparse: true,
	},
});
module.exports = model<IUser>("User", User);
