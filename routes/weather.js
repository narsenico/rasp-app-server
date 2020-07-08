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

router.get('/onecall', async (req, res) => {
    try {
            const onecall = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${OPENWEATHERAPILAT}&lon=${OPENWEATHERAPILON}&exclude=minutely,daily,current&units=${OPENWEATHERUNITS}&lang=${OPENWEATHERLANG}&appid=${OPENWEATHERAPIKEY}`
            );
            console.log(`openweathermap onecall status=${onecall.status}`);
            // estraggo info sulla posizione e orario
            const { lat, lon, timezone, timezone_offset } = onecall.data;
            // e solo alcune info delle previsioni per le prossime 48 ore
            const hourly = onecall.data.hourly.map((chunk) => {
                // ! dt = Time of the forecasted data, Unix, UTC
                const { dt, temp, humidity, weather } = chunk;
                return {
                    dt,
                    temp,
                    humidity,
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
