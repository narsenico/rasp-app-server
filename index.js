const express = require('express');
const cors = require('cors');
const { format: dfFormat } = require('date-fns');

const wasteCollectionRoute = require('./routes/wastecollection');
const nodeRedRoute = require('./routes/nodered');
const weatherRoute = require('./routes/weather');
const calendarRoute = require('./routes/calendar');

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
    console.log(`[${dfFormat(Date.now(), 'HH:mm:ss.SSS')}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/waste', wasteCollectionRoute);
app.use('/nodered', nodeRedRoute);
app.use('/weather', weatherRoute);
app.use('/calendar', calendarRoute);

app.all('/hello', (req, res) => {
    console.log(`hello method=${req.method}`);
    res.status(200).end();
});

app.listen(PORT, () => console.log('Listening on port', PORT));
