import axios from "axios";
import { ICodeforces } from "../models/codeforcesmodel";

const codeforecesscrap = async (ccuser: string) => {
	let codeforces_user = await axios
		.get(
			`https://competitive-coding-api.herokuapp.com/api/codeforces/${ccuser}`
		)
		.then(
			(res: {
				data: ICodeforces & { "max rating": string } & { status: string };
			}) => ({
				username: res.data.username,
				rating: res.data.rating,
				maxRating: res.data["max rating"],
				rank: res.data.rank,
				contests: res.data.contests,
				status: res.data.status == "Success" ? true : false,
			})
		)
		.catch((err) => ({
			username: undefined,
			rating: undefined,
			maxRating: undefined,
			rank: undefined,
			contests: undefined,
			status: false,
		}));
	return codeforces_user;
};
export default codeforecesscrap;
