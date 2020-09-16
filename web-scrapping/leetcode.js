const puppeteer = require('puppeteer');

var leetcodescrap = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://leetcode.com/sithis/');

  const leetcodeUser = await page.evaluate(() => ({
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

    recentSubmission: document.querySelector(
      '#base_content > div > div > div.col-sm-7.col-md-8 > div:nth-child(3) > ul'
    ).innerText,
  }));

  await browser.close();
};
module.exports = leetcodescrap;
