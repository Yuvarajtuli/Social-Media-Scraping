const scrapeFromQuora = require("../scraper/quora.scraper");


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

module.exports = { getQuoraData }