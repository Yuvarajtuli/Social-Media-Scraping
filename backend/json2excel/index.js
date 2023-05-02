const fs = require('fs');
const ExcelJs = require("exceljs");


async function jsonToExcel(quoraData, redditData, twitterData, youtubeData) {
    try {
        fs.unlinkSync('E://Yuvaraj/project/hackathon/ScratchMediaSoftware/frontend/scratchMediaa.xlsx');
    } catch (error) {
        console.log(error);
    }
    const workBook = new ExcelJs.Workbook();
    const quoraWorkSheet = workBook.addWorksheet("Quora");

    if (quoraData.length) {
        quoraWorkSheet.columns = [
            { header: "type", key: "type", width: "35" },
            { header: "timestamp", key: "timestamp", width: "35" },
            { header: "question", key: "question", width: "35" },
            { header: "answer", key: "answer", width: "35" },
            { header: "name", key: "name", width: "35" },
            { header: "link", key: "link", width: "35" },
            { header: "views", key: "views", width: "35" },
            { header: "searchType", key: "searchType", width: "35" }
        ];

        quoraData = JSON.parse(JSON.stringify(quoraData));
        quoraData.forEach((item, idx) => {
            quoraWorkSheet.addRow({ id: idx + 1, ...item })
        })
    }

    if (redditData.length) {
        const redditWorkSheet = workBook.addWorksheet("Reddit");

        redditWorkSheet.columns = [
            { header: "type", key: "type", width: "10" },
            { header: "group", key: "group", width: "25" },
            { header: "author", key: "author", width: "25" },
            { header: "question", key: "answer", width: "60" },
            { header: "upvotes", key: "upvotes", width: "10" },
            { header: "comment", key: "comment", width: "10" },
            { header: "timestamp", key: "timestamp", width: "30" },
            { header: "link", key: "link", width: "50" },
            { header: "searchType", key: "searchType", width: "15" },
        ]

        redditData = JSON.parse(JSON.stringify(redditData));
        redditData.forEach((item, idx) => {
            redditWorkSheet.addRow({ id: idx + 1, ...item })
        })

    }


    if (twitterData.length) {
        const twitterWorksheet = workBook.addWorksheet("Twitter");

        twitterWorksheet.columns = [
            { header: "type", key: "type", width: "10" },
            { header: "name", key: "group", width: "20" },
            { header: "handle", key: "handle", width: "20" },
            { header: "timestamp", key: "timestamp", width: "30" },
            { header: "text", key: "text", width: "60" },
            { header: "link", key: "link", width: "40" },
            { header: "searchType", key: "searchType", width: "15" },
        ]

        twitterData = JSON.parse(JSON.stringify(twitterData));
        twitterData.forEach((item, idx) => {
            twitterWorksheet.addRow({ id: idx + 1, ...item })
        })
    }

    if (youtubeData.length) {
        const youtubeWorksheet = workBook.addWorksheet("Youtube");

        youtubeWorksheet.columns = [
            { header: "embedUrl", key: "embedUrl", width: "60" },
            { header: "type", key: "type", width: "15" },
            { header: "timestamp", key: "timestamp", width: "30" },
            { header: "searchType", key: "searchType", width: "5" },
            { header: "title", key: "title", width: "20" },
        ]

        youtubeData = JSON.parse(JSON.stringify(youtubeData));
        youtubeData.forEach((item, idx) => {
            youtubeWorksheet.addRow({ id: idx + 1, ...item })
        })
    }

    await workBook.xlsx.writeFile('E://Yuvaraj/project/hackathon/ScratchMediaSoftware/frontend/scratchMediaa.xlsx');
}

module.exports = jsonToExcel;


module.exports = jsonToExcel;