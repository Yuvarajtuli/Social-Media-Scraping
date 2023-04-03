const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const { executablePath } = require('puppeteer')

function makePostObject(arr) {
    const obj = {};
    const group = arr[0];
    const accountHandle = arr[3];
    const timestamp = arr[4];
    const text = arr[5];
    const likes = arr[arr.length - 3];
    const comments = arr[arr.length - 2];

    obj['accountHandle'] = accountHandle;
    obj['group'] = group;
    obj['timestamp'] = timestamp;
    obj['text'] = text;
    obj['likes'] = likes;
    obj['comments'] = comments;
    return obj;
}
async function makeJSONObject(data) {
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
            const data = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div._2dkUkgRYbhbpU_2O2Wc5am').values()).
                    map(el => el.innerText)
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

async function scrapeFromReddit(keyword) {
    const browser = await puppeteer.launch({
        headless: false, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
        ], ignoreHTTPSErrors: true, executablePath: executablePath()
    });
    const page = await browser.newPage();
    const website = `https://www.reddit.com/search/?q=${keyword}`
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100);
    // await page.close();
    return scrappedData;
}

module.exports = scrapeFromReddit;