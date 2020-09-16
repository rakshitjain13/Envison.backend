const puppeteer = require('puppeteer');

var codeforcesscrap = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://codeforces.com/profile/rakshitjain13');
  const codeforces_user_detais = await page.evaluate(() => {
    if (document.querySelector('.info ul li span')) {
      return {
        username: Array.from(document.querySelectorAll('a.rated-user'))[45]
          .innerText,
        rating: document.querySelector('.info ul li span').innerText,
        rating_stage: document.querySelector('.user-rank').innerText,
      };
    } else {
      return {
        err: 'User Not found',
      };
    }
  });
  const page2 = await browser.newPage();
  await page2.goto('https://codeforces.com/contests/with/rakshitjain13');
  const codeforces_contest = await page2.evaluate(() => {
    const res = Array.from(
      document.querySelectorAll('.tablesorter tbody tr')
    ).map((item) => Array.from(item.querySelectorAll('td')));
    var list = [];
    for (var i = 0; i < res.length; i++) {
      list.push(res[i].map((item) => item.innerText));
    }
    return list;
  });

  await browser.close();
  const codeforces_user = {
    ...codeforces_user_detais,
    all_contest: codeforces_contest,
  };
  console.log(codeforces_user);
};

module.exports = codeforcesscrap;
