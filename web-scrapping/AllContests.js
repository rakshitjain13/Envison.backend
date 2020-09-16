const puppeteer = require('puppeteer');

var stopstalkscrap = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.stopstalk.com/contests');

  const allContests = await page.evaluate(() => ({
    alldata: document
      .querySelector('#contests-table > tbody')
      .innerText.split('\n'),
  }));

  allContests.alldata.forEach((element, index, thearr) => {
    thearr[index] = element.trim();
  });
  return allContests;
  await browser.close();
};
module.export = stopstalkscrap;
