import axios from "axios";
import { ILeetcode } from "../models/leetcodemodel";

const leetcodescrap = async (ccuser: string) => {
	let leetcode_user = await axios
		.get(`https://competitive-coding-api.herokuapp.com/api/leetcode/${ccuser}`)
		.then((res: { data: ILeetcode & { status: string; acceptance_rate :string} }) => {
			return {
				username: ccuser,
				ranking: res.data.ranking,
				total_problems_solved: res.data.total_problems_solved,
				acceptanceRate: res.data.acceptance_rate,
				easy_questions_solved: res.data.easy_questions_solved,
				medium_questions_solved: res.data.medium_questions_solved,
				hard_questions_solved: res.data.hard_questions_solved,
				contribution_points: res.data.contribution_points,
				reputation: res.data.reputation,
				status: res.data.status == "Success" ? true : false,
			};
		})
		.catch((err) => ({
			username: undefined,
			ranking: undefined,
			total_problems_solved: undefined,
			acceptanceRate: undefined,
			easy_questions_solved: undefined,
			medium_questions_solved: undefined,
			hard_questions_solved: undefined,
			contribution_points: undefined,
			reputation: undefined,
			status: false,
		}));
	return leetcode_user;
};
export default leetcodescrap;
