
/**
 * @param {String} inputDate
 */
const firstElement = arr => arr[0];

function classifyDuration(inputDate) {
    const currDate = new Date().getTime();
    const diff = parseInt(currDate - inputDate);
    if (diff >= 31557600000) {
        return 'Past year'
    }
    else if (diff >= 2629800000) {
        return 'Past months'
    }
    else if (diff >= 604800000) {
        return 'Past week'
    }
    else if (diff >= 86400000) {
        return 'Past day'
    }
    else if (diff >= 3600000) {
        return 'Past hours'
    }
}

function extractRedditDateFromHours(inputDate) {
    let currDate = new Date().getTime();
    const hour = firstElement(inputDate.split(' '))
    currDate = currDate - (3600000 * parseInt(hour));
    return classifyDuration(new Date(currDate));
}

function extractRedditDateFromDays(inputDate) {
    let currDate = new Date().getTime();
    const days = firstElement(inputDate.split(' '))
    currDate = currDate - (86400000 * parseInt(days));
    return classifyDuration(new Date(currDate));
}

function extractRedditDateFromMonths(inputDate) {
    let currDate = new Date().getTime();
    const months = firstElement(inputDate.split(' '))
    currDate = currDate - (2629800000 * parseInt(months));
    return classifyDuration(new Date(currDate));
}

function extractRedditDateFromYears(inputDate) {
    let currDate = new Date().getTime();
    const years = firstElement(inputDate.split(' '))
    currDate = currDate - (31557600000 * parseInt(years));
    return classifyDuration(new Date(currDate));
}

function extractRedditDate(inputDate) {
    if (!inputDate) return;
    if (inputDate.includes('hours')) {
        return extractRedditDateFromHours(inputDate);
    } else if (inputDate.includes('months')) {
        return extractRedditDateFromMonths(inputDate);
    } else if (inputDate.includes('days')) {
        return extractRedditDateFromDays(inputDate);
    } else if (inputDate.includes('years')) {
        return extractRedditDateFromYears(inputDate);
    }
}

module.exports = extractRedditDate;