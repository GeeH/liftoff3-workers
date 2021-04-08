var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(() => res.end(JSON.stringify({status: 'OK'})), 3000);
});

module.exports = router;
