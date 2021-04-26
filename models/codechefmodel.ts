import { Schema, Document, model, Types } from "mongoose";
export interface codechef_contest_type{
  rating:String;
  rank:String;
  name:String;
  end_date:String;
  code:String;
}
export interface ICodechef extends Document {
	username?: String;
	stars?: String;
	rating?: String;
	contest_ratings?: codechef_contest_type[];
	highest_rating?: String;
	global_rank?: String;
	country_rank?: String;
	status: Boolean;
}
var codechefUser = new Schema({
	username: {
		type: String,
		unique: true,
	},
	stars: {
		type: String,
		sparse: true,
	},
	rating: {
		type: String,
		sparse: true,
	},
	contest_ratings: {
		type: Array,
		sparse: true,
	},
	highest_rating: {
		type: String,
		sparse: true,
	},
	global_rank: {
		type: String,
		sparse: true,
	},
	country_rank: {
		type: String,
		sparse: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
});
module.exports = model<ICodechef>("codechefUser", codechefUser);
