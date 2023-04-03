require('dotenv').config();
const express = require('express');


const { getQuoraData } = require('./controllers/main.controller');
const verifyQuoraBody = require('./validations/quora.validation');
const chromium = require('chromium');
const {execFile} = require('child_process');
const app = express();


const PORT = process.env.PORT

app.use(express.json());


execFile(chromium.path, ['https://google.com'], err => {
	console.log('Hello Google!');
});

app.get('/crawl/quora', verifyQuoraBody, getQuoraData);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});
