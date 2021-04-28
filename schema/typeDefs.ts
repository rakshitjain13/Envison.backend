import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type Query {
		user(envision_handle: String): User
		usernametest(envision_handle: String!): Check
		codecheftest(codechef_handle: String!): Check
		codeforcestest(codeforces_handle: String!): Check
		leetcodetest(leetcode_handle: String!): Check
	}
	type Mutation {
		signin(id: String!, name: String!, email: String!): AfterSigin
		filldetails(
			envision_handle: String!
			codechef_handle: String
			codeforces_handle: String
			leetcode_handle: String
		): User
	}
	type AfterSigin {
		user: User
		token: String
		success: Boolean
	}
	type User {
		id: ID
		displayname: String
		envision_handle: String
		email: String
		codechef_handle: String
		codechef_id: Codechef
		codeforces_handle: String
		codeforces_id: Codeforces
		leetcode_handle: String
		leetcode_id: Leetcode
		username: String
	}
	type Codechef {
		id: ID
		username: String
		stars: String
		rating: String
		contest_ratings: [CodechefContest]
		highest_rating: String
		global_rank: String
		country_rank: String
		status: Boolean
	}
	type CodechefContest {
		rating: String
		rank: String
		name: String
		end_date: String
		code: String
	}
	type Codeforces {
		id: ID
		username: String
		maxRating: String
		rank: String
		contests: [CodeforcesContest]
		status: Boolean
	}
	type CodeforcesContest {
		Contest: String
		Rank: String
		Solved: String
		RatingChange: String
		NewRating: String
	}
	type Leetcode {
		username: String
		ranking: String
		total_problems_solved: String
		acceptanceRate: String
		easy_questions_solved: String
		medium_questions_solved: String
		hard_questions_solved: String
		contribution_points: String
		reputation: String
		status: Boolean
	}
	type Check {
		available: Boolean
	}
`;
