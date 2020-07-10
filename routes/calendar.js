/**
 * GET /events
 * -> 200: [event]
 * -> 401: manca autorizzazione ad accedere al calendario
 *    header: x-auth-url: authUrl
 *
 * PUT /auth
 * <- data: code recuperato da x-auth-url
 * -> 200
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const express = require('express');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// generato qua https://developers.google.com/calendar/quickstart/nodejs#step_2_install_the_client_library
const CREDENTIALS_PATH = path.join(__dirname, '../google_credentials.json');
// questo file conterrà il token di autenticazione
const TOKEN_PATH = path.join(__dirname, '../google_token.json');

async function createAuth() {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIALS_PATH, (err, content) => {
            if (err) {
                reject(err);
            } else {
                const credentials = JSON.parse(content);
                const {
                    client_secret,
                    client_id,
                    redirect_uris,
                } = credentials.installed;
                const oAuth2Client = new google.auth.OAuth2(
                    client_id,
                    client_secret,
                    redirect_uris[0]
                );
                resolve(oAuth2Client);
            }
        });
    });
}

async function readToken() {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                resolve(null);
            } else {
                resolve(JSON.parse(token));
            }
        });
    });
}

function parseDatePart(item, property) {
    const part = item[property];
    if (part.date) {
        return {
            allDay: true,
            [property]: new Date(part.date),
        };
    } else if (part.dateTime) {
        return {
            allDay: false,
            [property]: new Date(part.dateTime),
        };
    } else {
        return null;
    }
}

// async function listEvents(oAuth2Client, mode = 'simple') {
//     return new Promise((resolve, reject) => {
//         const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
//         calendar.events.list(
//             {
//                 calendarId: 'primary',
//                 timeMin: new Date().toISOString(),
//                 maxResults: 10,
//                 singleEvents: true,
//                 orderBy: 'startTime',
//             },
//             (err, res) => {
//                 if (err) {
//                     reject(err);
//                 } else if (mode === 'verbose') {
//                     resolve(res.data.items);
//                 } else {
//                     const events = res.data.items.map((item) => ({
//                         summary: item.summary,
//                         description: item.description,
//                         location: item.location,
//                         ...parseDatePart(item, 'start'),
//                         ...parseDatePart(item, 'end'),
//                     }));
//                     resolve(events);
//                 }
//             }
//         );
//     });
// }

async function listEvents(oAuth2Client, mode = 'simple') {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    // recupero le definizioi dei colori
    const colors = await calendar.colors.get({});
    // recupero la lista degli eventi a partire da adesso
    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    if (mode === 'verbose') {
        return res.data.items;
    } else {
        const events = res.data.items.map((item) => ({
            summary: item.summary,
            description: item.description,
            location: item.location,
            color: colors.data.event[item.colorId],
            ...parseDatePart(item, 'start'),
            ...parseDatePart(item, 'end'),
        }));
        return events;
    }
}

const router = express.Router();

router.get('/events', async (req, res) => {
    const mode = req.query.mode;
    try {
        // creo auth client
        const oAuth2Client = await createAuth();
        // leggo token, se non c'è ritorna null
        const token = await readToken();
        // se il token non esiste deve essere creato
        // chidendo al client il codice di autorizzazione
        if (token) {
            oAuth2Client.setCredentials(token);
            const events = await listEvents(oAuth2Client, mode);
            res.status(200).json(events).end();
        } else {
            // bisogna richiedere il token,
            // passo l'url per la creazione del codice autorizzativo con l'header
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            res.status(401).set('x-auth-url', authUrl).end();
        }
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

router.put('/auth', async (req, res) => {
    // mi aspetto il codice autorizzativo nel corpo della richiesta
    const code = req.body.code;
    if (code) {
        try {
            // creo auth client
            const oAuth2Client = await createAuth();
            // creo il token grazie al codice ricevuto
            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    throw new Error('Bad token');
                } else {
                    // salvo il token su file
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                        if (err) {
                            throw err;
                        } else {
                            res.status(200).end();
                        }
                    });
                }
            });
        } catch (e) {
            console.error(e);
            res.status(500).end();
        }
    } else {
        // manca il codice
        res.status(400).end();
    }
});

module.exports = router;
