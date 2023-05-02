/**
 * @param {String} inputDate
 */
const firstElement = arr => arr[0];

function strip(string){
    if (string) return string.replace(/^\s+|\s+$/g, '');
}


function classifyDuration(inputDate){
    if(typeof inputDate !== 'object'){
        return inputDate;
    }
    const currDate = new Date().getTime();
    const diff = parseInt(currDate - inputDate);
    if(diff>=31557600000){
        return 'Past year'
    }
    else if(diff>=2629800000){
        return 'Past months'
    }
    else if(diff>=604800000){
        return 'Past week'
    }
    else if(diff>=86400000){
        return 'Past day'
    }
}

function extractYoutubeDateFromHours(inputDate) {
    let currDate = new Date().getTime();
    const hour = firstElement(strip(inputDate).split(' '))
    currDate = currDate - (3600000 * parseInt(hour));
    return classifyDuration(new Date(currDate));
}

function extractYoutubeDateFromDays(inputDate) {
    let currDate = new Date().getTime();
    const days = firstElement(strip(inputDate).split(' '))
    currDate = currDate - (86400000 * parseInt(days));
     return classifyDuration(new Date(currDate));
}

function extractYoutubeDateFromMonths(inputDate) {
    let currDate = new Date().getTime();
    const months = firstElement(strip(inputDate).split(' '))
    currDate = currDate - (2629800000 * parseInt(months));
    return classifyDuration(new Date(currDate));
}

function extractYoutubeDateFromYears(inputDate) {
    let currDate = new Date().getTime();
    const years = firstElement(strip(inputDate).split(' '))
    currDate = currDate - (31557600000 * parseInt(years));
    return classifyDuration(new Date(currDate));
}

function extractYoutubeDate(inputDate) {
    if (!inputDate) return;
    if (inputDate.includes('hour') && inputDate.includes('ago')) {
        return extractYoutubeDateFromHours(inputDate);
    } else if (inputDate.includes('month') && inputDate.includes('ago')) {
        return extractYoutubeDateFromMonths(inputDate);
    } else if (inputDate.includes('day') && inputDate.includes('ago')) {
        return extractYoutubeDateFromDays(inputDate);
    } else if (inputDate.includes('year') && inputDate.includes('ago')) {
        return extractYoutubeDateFromYears(inputDate);
    }
    else {
        return inputDate
    }
}

module.exports = extractYoutubeDate;