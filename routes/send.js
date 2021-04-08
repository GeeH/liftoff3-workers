var express = require('express');
var router = express.Router();
var bs = require('nodestalker');

const fromNumber = 'TWILIO NUMBER';
const toNumber = 'NUMBER TO SEND TO';

const host = 'localhost';
const port = 11300;
var tube = 'messages';

var client = bs.Client(host + ':' + port);

router.get('/', function (req, res, next) {
    const job = {
        toNumber: toNumber,
        fromNumber: fromNumber,
        message: 'Space,” it says, “is big. Really big. You just won\'t believe how vastly, hugely, mindbogglingly big it is. I mean, you may think it\'s a long way down the road to the chemist\'s, but that\'s just peanuts to space.'
    };

    client.use(tube).onSuccess(() => {
        client.put(JSON.stringify(job)).onSuccess(job_id => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({job_id: job_id[0]}));
            client.disconnect();
        });
    });

});

module.exports = router;
