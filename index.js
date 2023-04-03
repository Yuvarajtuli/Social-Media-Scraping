require('dotenv').config();
const express = require('express');

const { getQuoraData } = require('./controllers/main.controller');
const verifyQuoraBody = require('./validations/quora.validation');
const app = express();

const PORT = process.env.PORT

app.use(express.json());


app.get('/crawl/quora', verifyQuoraBody, getQuoraData);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});