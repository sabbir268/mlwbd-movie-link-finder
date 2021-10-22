const puppeteer = require("puppeteer");
const fs = require("fs/promises");

function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}

async function start() {
    console.log("start", new Date(Date.now()));
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://mlwbd.top/?s=the matrix");

    // await page.type("#s", "avatar");
    // await Promise.all([page.click(".search-button"), page.waitForNavigation()]);
    // const info = await page.$eval("#message", el => el.textContent)
    await page.waitForXPath(
        '//*[@id="contenedor"]/div[3]/div[1]/div/div[2]/article/div[2]/div[1]/a'
    );
    //assuming it's the first element
    let [element] = await page.$x(
        '//*[@id="contenedor"]/div[3]/div[1]/div/div[2]/article/div[2]/div[1]/a'
    );
    let link = await page.evaluate(
        (element) => element.getAttribute("href"),
        element
    );
    await page.goto(link);
    // let lsd = await page.waitForSelector("input[name='s']");
    // console.log(lsd);
    const inputsValues = [];
    const inputElements = await page.$$("input");

    for (const element of inputElements) {
        let inputValue;

        let type = await element.getProperty("type");
        type = await type.jsonValue();
        console.log(type);
        if (type === "hidden") {
            inputValue = await element.getProperty("value");
            inputValue = await inputValue.jsonValue();
            if (validURL(inputValue)) {
                if (inputValue.search("songslyric") !== -1) {
                    inputsValues.push(inputValue);
                }
            }
        }
    }
    console.log(inputsValues);
    await browser.close();
    console.log("end", new Date(Date.now()));
}

start();