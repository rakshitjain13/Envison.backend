const puppeteer = require('puppeteer');

var codechefscrap = async (ccuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var codechef_user;
  try {
    await page.goto(`https://www.codechef.com/users/${ccuser}`);
    codechef_user = await page.evaluate(() => {
      if (document.querySelector('div.plr10 h2')) {
        return {
          name: document.querySelector('div.plr10 h2').innerText,
          star: document.querySelector('ul.side-nav li span span').innerText,
          rating: document.querySelector('.rating-number').innerText,
          allcontests: window.all_rating,
          highest_rating: document.querySelector('.rating-header small')
            .innerText,
          global_ranking: document.querySelector(
            'ul.inline-list li:nth-child(1) strong'
          ).innerText,
          country_ranking: document.querySelector(
            'ul.inline-list li:nth-child(2) strong'
          ).innerText,
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    });
  } catch (err) {
    codechef_user = { success: false, err };
  }
  await browser.close();
  return codechef_user;
};

module.exports = codechefscrap;
