const express = require('express');
const cors = require('cors');

const wasteCollectionRoute = require('./routes/wastecollection');
const nodeRedRoute = require('./routes/nodered');
const weatherRoute = require('./routes/weather');

// ! NON usare fs.promises perché la versione di node su raspberry non le supporta

// porta server
const PORT = process.env.PORT;
// percorso del contenuto statico
const WEBPATH = process.env.WEBPATH;

const app = express();
app.use(cors());
app.use(express.static(WEBPATH));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use('/waste', wasteCollectionRoute);
app.use('/nodered', nodeRedRoute);
app.use('/weather', weatherRoute);

app.all('/hello', (req, res) => {
    console.log(`hello method=${req.method}`);
    res.status(200).end();
});

app.listen(PORT, () => console.log('Listening on port', PORT));
