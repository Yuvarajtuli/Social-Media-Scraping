const fs = require('fs');
const jsonToExcel = require('../json2excel');

const postNewDataJSON = async (req, res) => {
    var arr = []
    for (var index in req.body) {
        arr.push(req.body[index])
    }
    let jsonData = JSON.stringify(arr, null, 2);
    fs.writeFile("E://Yuvaraj/project/hackathon/ScratchMediaSoftware/frontend/scratchMedia.json", jsonData, 'utf-8', (err, data) => {
        if (!err) {
            console.log('done');
        }
    })
}

const postNewDataCsv = async (req, res) => {
    const quoraData = [];
    const redditData = [];
    const twitterData = [];
    const youtubeData = [];
    let jsonData = Object.values(req.body);
    console.log(jsonData)
    for (let i = 0; i < jsonData.length; i++) {
        let item = jsonData[i];
        if (item) {
            if (item.type === 'quora') quoraData.push(item)
            else if (item.type === 'reddit') redditData.push(item)
            else if (item.type === 'twitter') twitterData.push(item)
            else if (item.type === 'youtube') youtubeData.push(item);
        }
    }
    jsonToExcel(quoraData, redditData, twitterData, youtubeData);
}

const postNewData = async (req, res) => {
    try {
        const { type } = req.query;
        if (type === 'json') {
            postNewDataJSON(req);
        }
        else if (type === 'csv') {
            postNewDataCsv(req);
        }
        res.status(200).end();
    } catch (error) {
        console.log(error);
        console.log('error aya bc')
    }
}

module.exports = { postNewData }