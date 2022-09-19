const { RawIntra } = require('epitech.js');
const { PuppeteerAuthProvider } = require('@epitech.js/puppeteer-auth-provider');
const express = require("express");

const app = express()

const intra = new RawIntra({
    provider: new PuppeteerAuthProvider({
        storageFilePath: './storage.json'
    })
});

intra.getAutologin();

app.get("/calendar", async function(req, res) {

    const stream = await intra.getCalendarFile({
        locations: ['FR/RUN', 'FR'],
        semesters: [0, 5, 6],
        onlyMyEvent: true,
        onlyMyPromo: true,
        onlyMyModule: true
    });
    
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
    stream.pipe(res);

});

app.listen(9191, () => {
    console.log("Server running on port 9191");
});