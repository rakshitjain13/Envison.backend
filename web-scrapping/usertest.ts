import axios from "axios";
import { ICodechef } from "../models/codechefmodel";
import { ICodeforces } from "../models/codeforcesmodel";
import { ILeetcode } from "../models/leetcodemodel";

export const codechefusertest = async (ccuser: string) => {
	const test_result=await axios
		.get(`https://competitive-coding-api.herokuapp.com/api/codechef/${ccuser}`)
		.then((res:{data:ICodechef}) => {
            return {status:res.data.status}
        })
		.catch((err) => ({status:false}));
    return test_result;
};
export const codeforcesusertest = async (ccuser: string) => {
	const test_result = await axios
		.get(`https://competitive-coding-api.herokuapp.com/api/codeforces/${ccuser}`)
		.then((res: { data: ICodeforces }) => {
			return { status: res.data.status };
		})
		.catch((err) => ({ status: false }));
	return test_result;
};
export const leetcodeusertest = async (ccuser: string) => {
	const test_result = await axios
		.get(
			`https://competitive-coding-api.herokuapp.com/api/leetcode/${ccuser}`
		)
		.then((res: { data: ILeetcode }) => {
			return { status: res.data.status };
		})
		.catch((err) => ({ status: false }));
	return test_result;
};



// exports.codeforcesusertest = async (cfuser) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   try {
//     await page.goto(`https://codeforces.com/profile/${cfuser}`);
//     codeforces_user = await page.evaluate(() => {
//       if (document.querySelector(".info ul li span")) {
//         return {
//           success: true,
//         };
//       } else {
//         return {
//           success: false,
//         };
//       }
//     });
//   } catch (err) {
//     codeforces_user = { success: false };
//   }

//   await browser.close();
//   return codeforces_user;
// };
// exports.atcoderusertest = async (lcuser) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   var atcoderUser;
//   try {
//     await page.goto(`https://atcoder.jp/users/${lcuser}`);

//      atcoderUser= await page.evaluate(() => {
//       if (document.querySelector(".username")) {
//         return { success: true};
//       } else {
//         return { success: false };
//       }
//     });
//   } catch (err) {
//     atcoderUser = { success: false,err};
//   }
//   await browser.close();
//   return atcoderUser;
// };
