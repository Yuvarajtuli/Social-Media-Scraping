const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const { executablePath } = require('puppeteer')

function makePostObject(arr) {
    const obj = {};
    const accountName = arr[0];
    const accountHandle = arr[1];
    const timestamp = arr[3];
    let text = "";
    for (let i = 4; i < arr.length - 2; i++) {
        text += arr[i];
    }
    const likes = arr[arr.length - 1];
    const retweets = arr[arr.length - 2];

    obj['accountName'] = accountName;
    obj['accountHandle'] = accountHandle;
    obj['timestamp'] = timestamp;
    obj['text'] = text;
    obj['likes'] = likes;
    obj['retweets'] = retweets;
    return obj;
}
async function makeJSONObject(data) {
    console.log(data);
    const finalResult = [];
    for (let i = 0; i < data.length; i++) {
        const splitted = data[i].split('\n');
        const textToObj = makePostObject(splitted);
        finalResult.push(textToObj);
    }
    return finalResult;
}

async function scrapeInfiniteScrollItems(page, numberOfItems) {
    const result = [];
    let prevCount = 0;
    let prevScroll = null;
    try {
        let previousHeight;
        while (result.length < numberOfItems) {
            await page.evaluate(() => {
                if (document.querySelectorAll('div.r-64el8z').length) {
                    document.querySelectorAll('div.r-64el8z:nth-child(2)')[0].click()
                }
            })
            const data = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.r-kzbkwu').values()).
                    map(el => el.innerText);
            })
            result.push(data);
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForTimeout(300);
            if (prevCount === 5) break;
            if (prevScroll === await page.evaluate('window.pageYOffset')) prevCount++
            else prevCount = 0;
            prevScroll = await page.evaluate('window.pageYOffset')
        }
    } catch (error) {
        console.log(error)
        return makeJSONObject(result[result.length - 1]);
    }

    return makeJSONObject(result[result.length - 1]);
};

async function scrapeFromTwitter(keyword) {

    const browser = await puppeteer.launch({
        headless: false, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
        ], ignoreHTTPSErrors: true, executablePath: executablePath()
    });
    const page = await browser.newPage();
    const website = `https://twitter.com/search?q=${keyword}&src=typed_query&f=top`
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100);
    await page.close();
    return scrappedData;
}

module.exports = scrapeFromTwitter;