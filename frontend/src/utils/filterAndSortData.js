/**
 * 
 * @function filterAndSortData
 * @param {Array<String>} allowedTypes 
 * @param {'Highest Likes' | 'Highest comments' | 'Date (Ascending order)' | 'Date (Descending order)'} sortOrder 
 * @param {Array<Object>} data 
 */

function sortForDate(arr, filterValue) {
    return arr.filter((item) => {
        if (item && item.timestamp && item.timestamp.includes(filterValue)) return item;
    })
}

function filterAndSortData(allowedTypes, sortOrder, data, typeSelected, dateFilter) {
    allowedTypes.map((item) => item.toLowerCase());
    const filteredByPlatformAndType = data.filter((item) => {
        if (allowedTypes.includes(item.type)) {
            if (typeSelected === 'both') return item;
            else if (typeSelected === 'bca' && item.searchType === 'bca') return item
            else if (typeSelected === 'mca' && item.searchType === 'mca') return item;
        }
    })
    if (dateFilter && dateFilter !== 'None') {
        console.log(filteredByPlatformAndType, dateFilter)
        return sortForDate(filteredByPlatformAndType, dateFilter)
    }
    return filteredByPlatformAndType;
}

export default filterAndSortData;