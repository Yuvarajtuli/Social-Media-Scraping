const axios = require('axios');
const puppeteer = require('puppeteer');

function makePostObject(arr) {
    const obj = {};
    if (arr[1] === 'Anonymous') {
        const question = arr[0];
        const username = arr[1];
        const timestamp = arr[2];
        const answer = arr[3];

        obj['question'] = question;
        obj['username'] = username;
        obj['timestamp'] = timestamp;
        obj['answer'] = answer;
        return obj;
    }
    else {
        const question = arr[0];
        const username = arr[1];
        const about = arr[2];
        const timestamp = arr[4];
        const answer = arr[5];

        obj['question'] = question;
        obj['username'] = username;
        obj['timestamp'] = timestamp;
        obj['about'] = about;
        obj['answer'] = answer;
        return obj;
    }


}
async function makeJSONObject(data) {
    const finalResult = [];
    for (let i = 0; i < data.length; i++) {
        const splitted = data[i].split('\n');
        if (i === 0) console.log(splitted)
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
                return Array.from(document.querySelectorAll('div.qu-p--medium').values()).
                    map(el => el.innerText);
            })
            // console.log(data);
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

async function scrapeFromQuora(keyword) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const website = `https://www.quora.com/search?q=${keyword}&type=answer`
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100);
    await page.close();
    return scrappedData;
}

module.exports = scrapeFromQuora;
