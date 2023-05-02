function extractSearchType(keyword) {
    switch (keyword) {
        case 'bca':
            return 'bca';
        case 'mca':
            return 'mca';
        case 'bachelor in computer application':
            return 'bca';
        case 'bachelors in computer application':
            return 'bca';
        case 'bachelors in computer applications':
            return 'bca';
        case 'bachelor in computer applications':
            return 'bca';
        case 'masters in computer application':
            return 'mca';
        case 'masters in computer applications':
            return 'mca'
        case 'master in computer application':
            return 'mca'

    }
}

module.exports = extractSearchType;