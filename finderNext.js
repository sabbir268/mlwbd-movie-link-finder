const axios = require("axios");
const cheerio = require("cheerio");

const finderNext = async(movieSearchString) => {
    const response = await axios.get(`https://mlwbd.top/?s=${movieSearchString}`);
    const $ = cheerio.load(response.data);
    const murl = $(".title>a").attr("href");
    if (murl) {
        const moviePage = await axios.get(murl);
        const $movie = cheerio.load(moviePage.data);
        const liks = $movie("input[name=FU]").val();
        return liks;
    } else {
        return "Not found!";
    }
};

exports.finderNext = finderNext;