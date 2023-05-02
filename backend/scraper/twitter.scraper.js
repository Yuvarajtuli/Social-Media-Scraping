const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const { executablePath } = require('puppeteer')

function makePostObject(name, handle, timestamp, like, replies, retweets, text, link,searchType) {
    const obj = {};
    obj['type'] = 'twitter'
    obj['name'] = name
    obj['handle'] = handle;
    obj['timestamp'] = timestamp;
    obj['like'] = like;
    obj['replies'] = replies;
    obj['retweets'] = retweets;
    obj['text'] = text;
    obj['link'] = link;
    obj['searchType'] = searchType;
    return obj;
}
async function makeJSONObject(names, handles, timestamps, likes, replies, retweets, text, links,searchType) {
    const finalResult = [];
    for (let i = 0; i < names.length; i++) {
        const textToObj = makePostObject(names[i], handles[i], timestamps[i], likes[i], replies[i], retweets[i], text[i], links[i],searchType);
        finalResult.push(textToObj);
    }
    return finalResult;
}

async function scrapeInfiniteScrollItems(page, numberOfItems,searchType) {
    let names = [];
    let handles = [];
    let timestamps = [];
    let replies = [];
    let retweets = [];
    let likes = [];
    let text = [];
    let links = [];
    let prevCount = 0;
    let prevScroll = null;
    try {
        let previousHeight;
        while (names.length < numberOfItems) {
            await page.evaluate(() => {
                if (document.querySelectorAll('div.r-64el8z').length) {
                    document.querySelectorAll('div.r-64el8z:nth-child(2)')[0].click()
                }
            })
            names = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a > div > div.css-901oao.r-1awozwy.r-18jsvk2.r-6koalj.r-37j5jr.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0 > span > span').values()).
                    map(el => el.innerText);
            });

            handles = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs > a > div > span').values()).
                    map(el => el.innerText);
            });
            timestamps = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div.css-1dbjc4n.r-18u37iz.r-1q142lx > a > time').values()).
                    map(el => el.innerText);
            });

            replies = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div > article > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(4)>div>div:nth-child(1)').values()).
                    map(el => el.innerText);
            });
            retweets = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div > article > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(4)>div>div:nth-child(2)').values()).
                    map(el => el.innerText);
            });

            likes = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div > article > div > div > div.css-1dbjc4n.r-18u37iz > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(4)>div>div:nth-child(3)').values()).
                    map(el => el.innerText);
            });
            text = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu > div:nth-child(2)').values()).
                    map(el => el.innerText);
            });
            links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div.css-1dbjc4n.r-18u37iz.r-1q142lx > a').values()).
                    map(el => el.href);
            });

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
        return makeJSONObject(names, handles, timestamps, likes, replies, retweets, text, links,searchType);
    }

    return makeJSONObject(names, handles, timestamps, likes, replies, retweets, text, links,searchType);
};

async function scrapeFromTwitter(keyword, searchType) {

    const browser = await puppeteer.launch({
        headless: true, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
        ], ignoreHTTPSErrors: true, executablePath: executablePath()
    });
    const page = await browser.newPage();
    const website = `https://twitter.com/search?q=${keyword}&src=typed_query&f=live`
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100, searchType);
    await browser.close();
    console.log('done')
    return scrappedData;
}

module.exports = scrapeFromTwitter;