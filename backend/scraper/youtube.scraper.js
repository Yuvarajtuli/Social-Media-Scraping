const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const { executablePath } = require('puppeteer');
const extractYoutubeDate = require('../utils/extractYoutubeData');

function makeUrlAsEmbed(str) {
    let latter = str.split('=')[1];
    return "https://youtube.com/embed/" + latter[1];
}
function makePostObject(str, timestamp, type, searchType, title) {
    const obj = {};
    const embedUrl = makeUrlAsEmbed(str)
    obj['embedUrl'] = embedUrl;
    obj['type'] = 'youtube';
    if (type === 'month') {
        obj['timestamp'] = 'Past month'
    }
    else if (type === 'year') {
        obj['timestamp'] = 'Past year'
    }
    else {
        obj['timestamp'] = extractYoutubeDate(timestamp);
    }
    obj['searchType'] = searchType
    obj['title'] = title;
    console.log(obj);
    return obj;
}
async function makeJSONObject(data, timestamps, type, searchType, titles) {
    const finalResult = [];
    for (let i = 0; i < data.length; i++) {
        console.log(data[i], timestamps[i], type, searchType, titles[i])
        const textToObj = makePostObject(data[i], timestamps[i], type, searchType, titles[i]);
        finalResult.push(textToObj);
    }
    return finalResult;
}

async function scrapeInfiniteScrollItems(page, numberOfItems, type, searchType) {
    let result = [];
    let titles = [];
    let timestamps = [];
    let prevCount = 0;
    let prevScroll = null;
    try {
        while (result.length < numberOfItems) {
            result = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('ytd-video-renderer.style-scope>div>ytd-thumbnail>a').values()).
                    map(el => el.href)
            })
            titles = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div>h3>a>yt-formatted-string').values()).
                    map(el => el.innerText)
            })
            timestamps = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#metadata-line > span:nth-child(4)').values()).
                    map(el => el.innerText)
            })
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
        return makeJSONObject(result, timestamps, type, searchType, titles);
    }

    return makeJSONObject(result, timestamps, type, searchType, titles);
};

async function scrapeFromYoutubeUsingUrlAndType(url, type, searchType) {
    const browser = await puppeteer.launch({
        headless: true, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
        ], ignoreHTTPSErrors: true, executablePath: executablePath()
    });
    const page = await browser.newPage();
    const website = url;
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100, type, searchType);
    await browser.close();
    return scrappedData;
}
async function scrapeFromYoutube(keyword, searchType) {
    const monthlyData = await scrapeFromYoutubeUsingUrlAndType(`https://www.youtube.com/results?search_query=${keyword}&sp=EgQIBBAB`, 'month', searchType);
    console.log('monthly done')
    const yearlyData = await scrapeFromYoutubeUsingUrlAndType(`https://www.youtube.com/results?search_query=${keyword}&sp=EgQIBRAB`, 'year', searchType);
    console.log('yearly done')
    const allTime = await scrapeFromYoutubeUsingUrlAndType(`https://www.youtube.com/results?search_query=${keyword}`, 'allTime', searchType);
    console.log('alltime done')
    if (monthlyData && yearlyData && allTime) {
        return (monthlyData).concat(yearlyData).concat(allTime)
    }

}

module.exports = scrapeFromYoutube;