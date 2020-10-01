const puppeteer = require("puppeteer");

exports.codechefusertest = async (ccuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var codechef_user;
  try {
    await page.goto(`https://www.codechef.com/users/${ccuser}`);
    codechef_user = await page.evaluate(() => {
      if (document.querySelector("div.plr10 h2")) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    });
  } catch (err) {
    codechef_user = { success: false,};
  }
  await browser.close();
  return codechef_user;
};
exports.codeforcesusertest = async (cfuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(`https://codeforces.com/profile/${cfuser}`);
    codeforces_user = await page.evaluate(() => {
      if (document.querySelector(".info ul li span")) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    });
  } catch (err) {
    codeforces_user = { success: false };
  }

  await browser.close();
  return codeforces_user;
};
exports.leetcodeusertest = async (lcuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var leetcodeUser;
  try {
    await page.goto(`https://leetcode.com/${lcuser}/`);

    leetcodeUser = await page.evaluate(() => {
      if (document.querySelector(".username")) {
        return { success: true};
      } else {
        return { success: false };
      }
    });
  } catch (err) {
    leetcodeUser = { success: false};
  }
  await browser.close();
  return leetcodeUser;
};