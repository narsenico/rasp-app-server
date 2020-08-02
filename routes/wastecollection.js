const fs = require('fs');
const express = require('express');

// percorso di destinazione di westdata
const WASTEDATAPATH = process.env.WASTEDATAPATH;

const WASTEDATA_TEMPLATE = {
    types: { P: 'Plastica', C: 'Carta', U: 'Umido', V: 'Vetro', S: 'Secco' },
    calendar: {},
};

// TODO: watch WASTEDATAPATH così lo leggo solo se viene modificato

async function readWasteData() {
    return new Promise((resolve, reject) => {
        fs.readFile(WASTEDATAPATH, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                if (data) {
                    resolve(JSON.parse(data));
                } else {
                    resolve({ ...WASTEDATA_TEMPLATE });
                }
            }
        });
    });
}

const router = express.Router();

router.post('/init', async (req, res) => {
    const overwrite = req.query['overwrite'] === 'yes';

    fs.exists(WASTEDATAPATH, (exists) => {
        if (!exists || overwrite) {
            fs.writeFile(
                WASTEDATAPATH,
                JSON.stringify(WASTEDATA_TEMPLATE),
                'utf-8',
                (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).end();
                    } else {
                        res.status(200).end();
                    }
                }
            );
            res.status(200).end();
        } else {
            // already exists
            res.status(422).end();
        }
    });
});

router.get('/data', async (req, res) => {
    try {
        const wasteData = await readWasteData();
        res.json(wasteData).end();
    } catch (err) {
        console.error(err);
        if (err.code === 'ENOENT') {
            res.status(404).end();
        } else {
            res.status(500).end();
        }
    }
});

router.put('/data', async (req, res) => {
    if (req.body && req.body.types && req.body.calendar) {
        fs.writeFile(
            WASTEDATAPATH,
            JSON.stringify(req.body),
            'utf-8',
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).end();
                } else {
                    res.status(200).end();
                }
            }
        );
        res.status(200).end();
    } else {
        res.status(400).send('wastedata not found').end();
    }
});

router.get('/:date', async (req, res) => {
    try {
        const wasteData = await readWasteData();
        const date = req.params.date;
        const nextDate = Object.keys(wasteData.calendar).find((d) => d > date);
        // ritorno un array
        // come primo elemento la data richiesta
        // come seoncdo il ritiro successivo alla data richiesta, se esiste
        const data = [{ date, waste: wasteData.calendar[date] || '' }];
        if (nextDate) {
            data.push({ date: nextDate, waste: wasteData.calendar[nextDate] });
        }
        res.json(data).end();
    } catch (err) {
        console.error(err);
        if (err.code === 'ENOENT') {
            res.status(404).end();
        } else {
            res.status(500).end();
        }
    }
});

module.exports = router;
