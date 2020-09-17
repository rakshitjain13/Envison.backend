const puppeteer = require('puppeteer');

var codeforcesscrap = async (cfuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var codeforces_user_detais, codeforces_contest;
  try {
    await page.goto(`https://codeforces.com/profile/${cfuser}`);
    codeforces_user_detais = await page.evaluate(() => {
      if (document.querySelector('.info ul li span')) {
        return {
          username: Array.from(document.querySelectorAll('a.rated-user'))[45]
            .innerText,
          rating: document.querySelector('.info ul li span').innerText,
          rating_stage: document.querySelector('.user-rank').innerText,
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    });
    const page2 = await browser.newPage();
    await page2.goto(`https://codeforces.com/contests/with/${cfuser}`);
    codeforces_contest = await page2.evaluate(() => {
      if (document.querySelectorAll('.tablesorter tbody tr')) {
        const res = Array.from(
          document.querySelectorAll('.tablesorter tbody tr')
        ).map((item) => Array.from(item.querySelectorAll('td')));
        var list = [];
        for (var i = 0; i < res.length; i++) {
          list.push(res[i].map((item) => item.innerText));
        }
        return list;
      } else {
        return [];
      }
    });
    codeforces_user = {
      ...codeforces_user_detais,
      allcontests: codeforces_contest,
    };
  } catch (err) {
    codeforces_user = { success: false, err };
  }

  await browser.close();
  return codeforces_user;
};

module.exports = codeforcesscrap;
