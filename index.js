const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");
const PORT = 8000;

const app = express();
const url =
  "https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A502394&ref=nav_em__nav_desktop_sa_intl_camera_and_photo_0_2_5_3";

axios(url)
  .then((response) => {
    const html = response.data;
    // console.log("html", html);
    const $ = cheerio.load(html);
    const articles = [];
    $(".a-size-mini", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log("articles", articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
