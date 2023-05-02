const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const { executablePath } = require('puppeteer')

let hogyaYaNahi = false;
function makePostObject(question, answer, name, timestamp, view, link, type, searchType) {
    const obj = {};
    obj['type'] = 'quora';
    if (type === 'week') {
        obj['timestamp'] = 'Past week';
    }
    else if (type === 'month') {
        obj['timestamp'] = 'Past month'
    }
    else if (type === 'day') {
        obj['timestamp'] = 'Past day';
    }
    else if (type === 'hour') {
        obj['timestamp'] = 'Past hour'
    }
    else if (type === 'year') {
        obj['timestamp'] = 'Past year'
    }
    else {
        obj['timestamp'] = timestamp;
    }
    obj['question'] = question;
    obj['answer'] = answer;
    obj['name'] = name;
    obj['views'] = view;
    obj['link'] = link;
    obj['searchType'] = searchType;
    return obj;
}

async function makeJSONObject(questions, answers, names, timestamps, views, links, type, searchType) {
    const finalResult = [];
    for (let i = 0; i < questions.length; i++) {

        const textToObj = makePostObject(questions[i], answers[i], names[i], timestamps[i], views[i], links[i], type, searchType);
        finalResult.push(textToObj);

    }
    return finalResult;
}

async function scrapeInfiniteScrollItems(page, numberOfItems, type, searchType) {
    let questions = [];
    let answers = [];
    let names = [];
    let timestamps = [];
    let views = [];
    let links = [];
    let linksWhichWereNotFound = [];
    let prev = 0;
    let prevScroll = null;

    try {
        let previousHeight;
        while (questions.length < numberOfItems) {
            await page.evaluate(() => {
                if (document.querySelectorAll('.puppeteer_test_answer_content>div>div>div:nth-child(2)>div').length) {
                    document.querySelectorAll('.puppeteer_test_answer_content>div>div>div:nth-child(2)>div').forEach((item) => {
                        item.click()
                    })
                }
            });

            questions = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.puppeteer_test_question_title').values()).
                    map(el => el.innerText);
            });

            answers = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.puppeteer_test_answer_content').values()).
                    map(el => el.innerText);
            });

            names = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>div>span>span>div>div>div>div>div>a.puppeteer_test_link>div>span').values()).
                    map(el => el.innerText);
            });

            timestamps = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.qu-p--medium>div:nth-child(2)>div>div>div>div>div>div>div>div:nth-child(2)>div:nth-child(2)>span>span>span>span>a').values()).
                    map(el => el.innerText);
            })

            views = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.qu-mt--small>div>span>span:nth-child(2)').values()).
                    map(el => el.innerText);
            })

            links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('.q-box>span > a').values()).
                    map(el => el.href);
            })

            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForTimeout(300);
            if (prev === 5) break;
            if (prevScroll === await page.evaluate('window.pageYOffset')) prev++
            else prev = 0;
            prevScroll = await page.evaluate('window.pageYOffset')
        }
    } catch (error) {
        console.log(error)
        return makeJSONObject(questions, answers, names, timestamps, views, links, type, searchType);
    }

    return makeJSONObject(questions, answers, names, timestamps, views, links, type, searchType);
};

async function scrapeFromQuoraByUrlKeywordAndType(url, type, searchType) {
    const browser = await puppeteer.launch({
        headless: true, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--hide-scrollbars',
            '--disable-web-security',
        ], ignoreHTTPSErrors: true, executablePath: executablePath()
    });
    const page = await browser.newPage();
    const website = url;
    await page.goto(website);
    const scrappedData = await scrapeInfiniteScrollItems(page, 100, type, searchType)
    await browser.close();
    return scrappedData;

}
async function scrapeFromQuora(keyword, searchType) {
    const hourlyData = await scrapeFromQuoraByUrlKeywordAndType(`https://www.quora.com/search?q=${keyword}&type=answer&time=hour`, 'hour', searchType);
    console.log('hourly done');
    const weeklyData = await scrapeFromQuoraByUrlKeywordAndType(`https://www.quora.com/search?q=${keyword}&type=answer&time=week`, 'week', searchType);
    console.log('weekly done');
    const monthlyData = await scrapeFromQuoraByUrlKeywordAndType(`https://www.quora.com/search?q=${keyword}&type=answer&time=month`, 'month', searchType);
    console.log('monthly done')
    const yearlyData = await scrapeFromQuoraByUrlKeywordAndType(`https://www.quora.com/search?q=${keyword}&type=answer&time=year`, 'year', searchType);
    console.log('yearly done')
    if (hourlyData && weeklyData && monthlyData && yearlyData) {
        return hourlyData.concat(weeklyData).concat(monthlyData).concat(yearlyData)
    }


}

module.exports = scrapeFromQuora;