const puppeteer = require('puppeteer');

var leetcodescrap = async (lcuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var leetcodeUser;
  try {
    await page.goto(`https://leetcode.com/${lcuser}/`);

    leetcodeUser = await page.evaluate(() => {
      if (document.querySelector(".username__o7KX")) {
        recentSubmission = [];
        if (
          Array.from(document.querySelectorAll(".ant-list-item.css-nvdml7"))
        ) {
          recentSubmission = Array.from(
            document.querySelectorAll(".ant-list-item.css-nvdml7")
          );
          var list = [];
          for (let i = 0; i < recentSubmission.length; i++) {
            list.push(recentSubmission[i].innerText);
          }
          recentSubmission = list;
        }

        return {
          name: document.querySelector(".username__o7KX").innerText,
          ranking: document.querySelector(".css-rcx088").innerText,
          ratings: document.querySelector(".css-181az6d").innerText,
          solvedQuestions: document.querySelector(".total-solved-count__2El1")
            .innerText,

          acceptanceRate: document.querySelector(
            ".css-1b3bb7o-PercentNumber.e5i1odf1"
          ).innerText,

          submissionsInLastYear: document.querySelectorAll(
            ".ant-card-head-title"
          )[3].innerText,

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
