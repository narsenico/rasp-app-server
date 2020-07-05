const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// porta server
const PORT = process.env.PORT;
// percorso del contenuto statico
const WEBPATH = process.env.WEBPATH;
// percorso di destinazione di westdata
const WASTEDATADEST = process.env.WASTEDATADEST;

const app = express();
app.use(cors());
app.use(express.static(WEBPATH));
app.use(express.json());

app.put('/copywastedata', async (req, res) => {
    try {
        if (req.body && req.body.types && req.body.calendar) {
            await fs.writeFile(
                WASTEDATADEST,
                JSON.stringify(req.body),
                'utf-8'
            );
            res.status(200).end();
        } else {
            res.status(400).send('wastedata not found').end();
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message).end();
    }
});

app.post('/restartrednode', (req, res) => {
    // TODO: riavviare rednode
    res.status(200).end();
});

app.listen(PORT, () => console.log('Listening on port', PORT));
