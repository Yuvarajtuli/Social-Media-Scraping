const { Parser } = require('json2csv');
const fs = require('fs');

function json2csvConvert(data) {
    const person =  {
        "embedUrl": "https://youtube.com/embed/KfSuTYbVMa4&pp",
        "type": "youtube",
        "timestamp": "Past months",
        "searchType": "bca",
        "title": "He got TCS in BCA and cracked Amazon with 45LPA after MCA"
    }
    const parseObj = new Parser();
    const csv = parseObj.parse(person);
    console.log(csv);
    return csv;
}

module.exports = json2csvConvert;