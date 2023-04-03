const scrapeFromQuora = require("../scraper/quora.scraper");
const scrapeFromReddit = require("../scraper/reddit.scraper");
const scrapeFromTwitter = require("../scraper/twitter.scraper");


const getQuoraData = async (req, res) => {
    try {
        const { keyword } = req.body;
        const scrappedData = await scrapeFromQuora(keyword)
        console.log(scrappedData);
        res.status(200).json(scrappedData);
    } catch (err) {
        console.log('ERROR AYA BHAIA', err);
    }
}

const getTwitterData = async (req, res) => {
    try {
        const { keyword } = req.body;
        const scrappedData = await scrapeFromTwitter(keyword);
        res.status(200).json(scrappedData);
    } catch (err) {
        console.log('ERROR AYA BHAIA', err);
    }
}

const getRedditData = async (req, res) => {
    try {
        const { keyword } = req.body;
        const scrappedData = await scrapeFromReddit(keyword);
        res.status(200).json(scrappedData);
    } catch (err) {
        console.log('ERROR AYA BHAIA', err);
    }
}
module.exports = { getQuoraData, getTwitterData, getRedditData }