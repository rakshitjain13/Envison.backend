const { listenerCount } = require('process');
const puppeteer = require('puppeteer');

var clistscrap = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://clist.by/', {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  });

  const allContests = await page.evaluate(() => {
    var li = [];
    var arr = Array.from(document.querySelectorAll('.data-ace'));
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        var te = JSON.parse(arr[i].dataset['ace']);
        if (
          te.location == 'codechef.com' ||
          te.location == 'codeforces.com' ||
          te.location == 'leetcode.com'
        )
          li.push(te);
      }
      return { currcontests: li, success: true };
    } else {
      return { success: false };
    }
  });

  return allContests;
  await browser.close();
};
module.exports = clistscrap;
