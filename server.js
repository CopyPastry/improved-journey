/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Michael Chan
 * Email: chanmic@oregonstate.edu
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var handlebars = require('express-handlebars');
<<<<<<< HEAD
var MongoClient = require('mongodb').MongoClient;
//var videos = require('./videos.json');
=======
var videos = require('./videos.json');
>>>>>>> 45623041cebcbca8b16893cde6acef42be4f432d
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4112;

var mongoURL = 'mongodb://cs290_miurary:cs290_miurary@classmongo.engr.oregonstate.edu:27017/cs290_miurary';
var mongoConnection = null;

app.engine('handlebars', handlebars( {
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  var collection = mongoConnection.collection('final');
  var videos = collection.find({}).toArray(function (err, videos) {
    if (err) {
      res.status(500).send("Error fetching");
    }
    else {
      res.status(200).render('index', {
        video: videos
      });
      console.log("== Server status", res.statusCode);
    }
  })

});

app.use(express.static('public'));
app.use(bodyParser.json());

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

app.post('/addVideo', function (req, res, next) {

if (req.body && req.body.title && req.body.videoId) {
  var collection = mongoConnection.collection('final');
  collection.insertOne({
    title: req.body.title,
    videoId: req.body.videoId
  })
  res.status(200).send("Swag");
}
else {
  res.status(400).send("Oh no :(");
}
});

MongoClient.connect (mongoURL, function (err, connection) {

  if (err)
    throw err;
  mongoConnection = connection;
  app.listen(port, function () {
    console.log("== Server listening on port:", port);
});
});
