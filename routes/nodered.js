const { exec } = require('child_process');
const express = require('express');

// comando per riavvio node-red
const NODEREDRESTART = process.env.NODEREDRESTART;

const router = express.Router();

router.post('/apply', (req, res) => {
    exec(NODEREDRESTART, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else if (stderr) {
            console.error(stderr);
            res.status(500).end();
        } else {
            console.log(`exec "${NODEREDRESTART}" => ${stdout}"`);
            res.status(200).end();
        }
    });
});

module.exports = router;