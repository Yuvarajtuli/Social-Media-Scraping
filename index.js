require('dotenv').config();
const express = require('express');


const { getQuoraData, getTwitterData, getRedditData } = require('./controllers/main.controller');
const verifyBody = require('./validations/quora.validation');
const app = express();


const PORT = process.env.PORT

app.use(express.json());


app.get('/crawl/quora', verifyBody, getQuoraData);
app.get('/crawl/twitter', verifyBody, getTwitterData);
app.get('/crawl/reddit', verifyBody, getRedditData);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});