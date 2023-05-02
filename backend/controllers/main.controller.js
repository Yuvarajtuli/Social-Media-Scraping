const scrapeFromQuora = require("../scraper/quora.scraper");
const scrapeFromReddit = require("../scraper/reddit.scraper");
const scrapeFromTwitter = require("../scraper/twitter.scraper");
const scrapeFromYoutube = require("../scraper/youtube.scraper");
const extractSearchType = require("../utils/extractSearchType");


const getQuoraData = async (req, res) => {
    try {
        const { keyword } = req.body;
        console.log('QUORA', keyword);
        const searchType = extractSearchType(keyword);
        const scrappedData = await scrapeFromQuora(keyword,searchType)
        res.status(200).json(scrappedData);
    } catch (err) {
        console.log('ERROR AYA BHAIA', err);
    }
}

const getTwitterData = async (req, res) => {
    try {
        const { keyword } = req.body;
        console.log('TWITTER', keyword);
        const searchType = extractSearchType(keyword);
        const scrappedData = await scrapeFromTwitter(keyword,searchType);
        res.status(200).json(scrappedData);
    } catch (err) {
        console.log('ERROR AYA BHAIA', err);
    }
}

const getRedditData = async (req, res) => {
    try {
        const { keyword } = req.body;
        console.log('REDDIT', keyword);
        const searchType = extractSearchType(keyword);
        const scrappedData = await scrapeFromReddit(keyword,searchType);
        res.status(200).json(scrappedData);
    } catch (err) {
        console.log('ERROR AYA BHAIA', err);
    }
}

const getYoutubeData = async (req, res) => {
    try {
        const { keyword } = req.body;
        console.log('YOUTUBE', keyword);
        const searchType = extractSearchType(keyword);
        const scrappedData = await scrapeFromYoutube(keyword,searchType);
        res.status(200).json(scrappedData);
    } catch (error) {
    }
}

module.exports = { getQuoraData, getTwitterData, getRedditData, getYoutubeData }