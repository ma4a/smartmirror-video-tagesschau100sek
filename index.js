'use strict';

var express = require('express');
var app = express();

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  controller.get()
    .then((videoURL) => {
      res.render('app/view.jade', {videoURL: videoURL});
    });
});

app.listen(8080, function () {
  console.log('Module is listening on port 8080!');
});