require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { getQuoraData, getTwitterData, getRedditData, getYoutubeData } = require('./controllers/main.controller');
const verifyBody = require('./validations/quora.validation');
const { postNewData } = require('./controllers/newData.controller');
const app = express();


const PORT = process.env.PORT

app.use(express.json({ limit: '50MB' }));


app.use(
    cors({
        origin: `http://localhost:5173`,
        allowedHeaders: "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept,'Authorization', 'x-csrf-token'",
        credentials: true,
    })
);

app.options("*", cors());

app.post('/crawl/quora', verifyBody, getQuoraData);
app.post('/crawl/twitter', verifyBody, getTwitterData);
app.post('/crawl/reddit', verifyBody, getRedditData);
app.post('/crawl/youtube', verifyBody, getYoutubeData);

app.post('/freshData', postNewData);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
});