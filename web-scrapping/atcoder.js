const puppeteer = require("puppeteer");

var atcoderscrap = async (lcuser) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  var atcoderUser;
try {
  await page.goto(`https://atcoder.jp/users/${lcuser}`);

  atcoderUser = await page.evaluate(() => {
    if (document.querySelector(".username")) {
      if (window.rating_history) {
        recentSubmission = window.rating_history;
      } else if (window.rank_history) {
        recentSubmission = window.rank_history;
      } else {
        recentSubmission = null;
      }
      table = Array.from(document.querySelectorAll(".dl-table"));
      if (table.length == 2) {
        data = table[1].innerText.split("\n");
      } else {
        data = null;
      }

      return {
        data,
        name: document.querySelector(".username").innerText,
        recentSubmission,
        success: true,
      };
    } else {
      console.log("Error");
      return { success: false, err: "error" };
    }
  });
} catch (err) {
  console.log("Erro");
  atcoderUser = { success: false, err };
}
  await browser.close();
  return atcoderUser;
};
module.exports = atcoderscrap;
