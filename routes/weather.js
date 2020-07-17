const axios = require('axios');
const express = require('express');

// API KEY per OpenWeather
const OPENWEATHERAPIKEY = process.env.OPENWEATHERAPIKEY;
// latitudine per OpenWeather
const OPENWEATHERAPILAT = process.env.OPENWEATHERAPILAT;
// longitudine per OpenWeather
const OPENWEATHERAPILON = process.env.OPENWEATHERAPILON;
// lingua per OpenWeather: "description" sarà localizzato
const OPENWEATHERLANG = process.env.OPENWEATHERLANG;
// unità di misura per OpenWeather
const OPENWEATHERUNITS = process.env.OPENWEATHERUNITS;

const router = express.Router();

router.get('/forecast', async (req, res) => {
    try {
        const onecall = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${OPENWEATHERAPILAT}&lon=${OPENWEATHERAPILON}&exclude=minutely,daily&units=${OPENWEATHERUNITS}&lang=${OPENWEATHERLANG}&appid=${OPENWEATHERAPIKEY}`
        );
        console.log(`openweathermap onecall status=${onecall.status}`);
        // estraggo info sulla posizione e orario
        const { lat, lon, timezone, timezone_offset } = onecall.data;
        // e solo alcune info delle previsioni per le prossime 48 ore
        // console.log(onecall.data.hourly);
        const hourly = onecall.data.hourly.map((chunk) => {
            // TODO: è possibile recuperare alba e tramonto (current.sunrise,sunset)? per differenziare le icone
            // dt => Time of the forecasted data, Unix, UTC
            const { dt, temp, humidity, weather } = chunk;
            return {
                date: new Date(dt * 1000),
                temp,
                humidity,
                // TODO: vorrei inviare anche la situazione peggiore nelle prox n ore
                weather,
            };
        });
        res.status(200)
            .json({
                lat,
                lon,
                timezone,
                timezone_offset,
                hourly,
            })
            .end();
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

module.exports = router;
