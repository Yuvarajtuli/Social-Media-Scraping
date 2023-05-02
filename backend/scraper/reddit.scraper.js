const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const { executablePath } = require('puppeteer');
const extractRedditDate = require('../utils/extractRedditDate');

function removeSigns(str) {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '?' || str[i] === '+') {
            continue;
        }
        else {
            newStr += str[i];
        }
    }
    return newStr.split(' ').join('_');
}
function makePostObject(groupName, author, question, upvote, comment, timestamp, link, searchType) {
    const obj = {};

    obj['type'] = 'reddit';
    obj['group'] = groupName;
    obj['author'] = author;
    obj['question'] = question;
    obj['upvotes'] = upvote;
    obj['comment'] = comment;
    obj['timestamp'] = extractRedditDate(timestamp);
    obj['link'] = link;
    obj['searchType'] = searchType

    return obj;
}
async function makeJSONObject(groups, postedBy, questions, upvotes, comments, timestamps, links, searchType) {
    const finalResult = [];
    for (let i = 0; i < groups.length; i++) {
        const textToObj = makePostObject(groups[i], postedBy[i], questions[i], upvotes[i].split(' ')[0], comments[i].split(' ')[0], timestamps[i], links[i], searchType);
        finalResult.push(textToObj);
    }
    return finalResult;
}

async function scrapeInfiniteScrollItems(page, numberOfItems, searchType) {
    let groups = [];
    let postedBy = [];
    let questions = [];
    let upvotes = [];
    let comments = [];
    let timestamps = [];
    let links = [];
    let prevCount = 0;
    let prevScroll = null;
    try {
        let previousHeight;
        while (groups.length < numberOfItems) {
            groups = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('._305seOZmrgus3clHOXCmfs').values()).
                    map(el => el.innerText)
            });
            postedBy = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.oQctV4n0yUb0uiHDdGnmE').values()).
                    map(el => el.innerText)
            });
            questions = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('h3._eYtD2XCVieq6emjKBH3m').values()).
                    map(el => el.innerText)
            });
            upvotes = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('span._vaFo96phV6L5Hltvwcox:nth-child(1)').values()).
                    map(el => el.innerText)
            });
            comments = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('span._vaFo96phV6L5Hltvwcox:nth-child(2)').values()).
                    map(el => el.innerText)
            });
            timestamps = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div._2n04GrCyhhQf-Kshn7akmH._37TF67KpZQl9SHbiAhz3mf._3xeOZ4NlqvpwzbB5E8QC6r._3zxBrqnz24HT1z7OOcRXCS > div._3xeOZ4NlqvpwzbB5E8QC6r > span:nth-child(3)').values()).
                    map(el => el.innerText)
            });
            links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div > div._2n04GrCyhhQf-Kshn7akmH._19FzInkloQSdrf0rh3Omen > div > div > div:nth-child(3) > a').values()).
                    map(el => el.href)
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
        return makeJSONObject(groups, postedBy, questions, upvotes, comments, timestamps, links, searchType);
    }

    return makeJSONObject(groups, postedBy, questions, upvotes, comments, timestamps, links, searchType);
};

async function scrapeFromReddit(keyword, searchType) {
    const browser = await puppeteer.launch({
        headless: true, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
        ], ignoreHTTPSErrors: true, executablePath: executablePath()
    });
    const page = await browser.newPage();
    const website = `https://www.reddit.com/search/?q=${keyword}`
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100, searchType);
    console.log('done')
    await browser.close();
    return scrappedData;
}

module.exports = scrapeFromReddit;