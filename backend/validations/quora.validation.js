const verifyQuoraBody = (req, res, next) => {
    const { keyword } = req.body;
    if (!keyword) {
        res.status(400).json({
            "message": "Please provide a keyword!"
        })
    }
    else if (typeof keyword !== 'string') {
        res.status(400).json({
            "message": "Keyword should be of type string"
        })
    }
    else if (keyword.toLowerCase() !== 'bca' && keyword.toLowerCase() !== 'mca' && keyword.toLowerCase() !== 'bachelor in computer application' && keyword.toLowerCase() !== 'masters in computer application' && keyword.toLowerCase() !== 'masters in computer applications' && keyword.toLowerCase() !== 'master in computer application') {
        res.status(400).json({
            "message": "Keyword should be only bca or mca"
        })
    }
    else {
        next();
    }
}

module.exports = verifyQuoraBody;