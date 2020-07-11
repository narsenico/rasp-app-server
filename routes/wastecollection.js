const fs = require('fs');
const express = require('express');

// percorso di destinazione di westdata
const WASTEDATAPATH = process.env.WASTEDATAPATH;

const WASTEDATA_TEMPLATE = {
    types: { P: 'Plastica', C: 'Carta', U: 'Umido', V: 'Vetro', S: 'Secco' },
    calendar: {},
};

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(WASTEDATAPATH, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            if (err.code === 'ENOENT') {
                res.status(404).end();
            } else {
                res.status(500).end();
            }
        } else {
            if (data) {
                res.status(200).json(data).end();
            } else {
                res.status(204).end();
            }
        }
    });
});

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

module.exports = router;
