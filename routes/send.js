var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const client = require('twilio')(process.env.TWILIO_DEMO_ACCOUNT_SID, process.env.TWILIO_DEMO_AUTH_TOKEN);
    const fromNumber = 'YOUR TWILIO NUMER';
    const toNumber = 'YOUR MOBILE NUMBER';

    client.messages
        .create({
            body: 'The chances of finding out what’s really going on in the universe are so remote, the only thing to do is hang the sense of it and keep yourself occupied.',
            from: fromNumber,
            to: toNumber,
        })
        .then(message => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({sid: message.sid}));
        });
});

module.exports = router;
