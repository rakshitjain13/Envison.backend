import axios from "axios";
import { ICodechef } from "../models/codechefmodel";

const codechefscrap = async (ccuser: string) => {
	let codechef_user = await axios
		.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${ccuser}`)
		.then((res: { data: ICodechef & { status: string } }) => ({
			username: ccuser,
			stars: res.data.stars,
			rating: res.data.rating,
			contest_ratings: res.data.contest_ratings,
			highest_rating: res.data.highest_rating,
			global_rank: res.data.global_rank,
			country_rank: res.data.country_rank,
			status: res.data.status == "Success" ? true : false,
		}))
		.catch((err) => ({
			name: undefined,
			username: undefined,
			stars: undefined,
			rating: undefined,
			contest_ratings: undefined,
			highest_rating: undefined,
			global_rank: undefined,
			country_rank: undefined,
			status: false,
		}));
	return codechef_user;
};
export default codechefscrap;
