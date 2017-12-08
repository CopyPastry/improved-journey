/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Michael Chan
 * Email: chanmic@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars');
var videos = require('./videos.json');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4111;

app.engine('handlebars', handlebars( {
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).render('index', {
    video: videos
  });
  console.log("== Server status", res.statusCode);
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404');
  console.log("== Server status", res.statusCode);
});

app.post('/post', function (req, res) {
  console.log("== request body:", req.body);
  videos.push({
    title: req.body.title,
    videoId: req.body.videoId
  });
  console.log("== new video:", videos);
  res.status(200).send("Success");
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
