'use strict';

var express = require('express');
var app = express();

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('app/view.jade', {});
});

app.listen(8080, function () {
    console.log('Module is listening on port 8080!');
});