var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var sendRouter = require('./routes/send');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/send', sendRouter);

module.exports = app;
