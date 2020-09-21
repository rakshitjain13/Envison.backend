const puppeteer = require('puppeteer');

var leetcodescrap = async (lcuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var leetcodeUser;
  try {
    await page.goto(`https://leetcode.com/${lcuser}/`);

    leetcodeUser = await page.evaluate(() => {
      if (document.querySelector('.username')) {
        recentSubmission = [];
        if (
          document.querySelector(
            '#base_content > div > div > div.col-sm-7.col-md-8 > div:nth-child(3) > ul'
          )
        ) {
          recentSubmission = document
            .querySelector(
              '#base_content > div > div > div.col-sm-7.col-md-8 > div:nth-child(3) > ul'
            )
            .innerText.split('\n');
          var list = [];
          for (let i = 2; i < recentSubmission.length; i += 3) {
            list.push(recentSubmission[i]);
          }
          recentSubmission = list;
        }

        return {
          name: document.querySelector('.username').innerText,
          finishedContests: document.querySelector(
            '#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(2) > ul > li > span'
          ).innerText,

          solvedQuestions: document.querySelector(
            '#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(3) > ul > li:nth-child(1) > span'
          ).innerText,

          acceptedSubmissions: document.querySelector(
            '#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(3) > ul > li:nth-child(2) > span'
          ).innerText,

          acceptanceRate: document.querySelector(
            '#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(3) > ul > li:nth-child(3) > span'
          ).innerText,

          submissionsInLastYear: document.querySelector(
            '#base_content > div > div > div.col-sm-7.col-md-8 > div:nth-child(1) > div.panel-heading > h3'
          ).innerText,

          recentSubmission,
          success: true,
        };
      } else {
        return { success: false };
      }
    });
  } catch (err) {
    leetcodeUser = { success: false, err };
  }
  await browser.close();
  return leetcodeUser;
};
module.exports = leetcodescrap;

