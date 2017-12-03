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
var app = express();
var port = process.env.PORT || 4000;

app.engine( 'handlebars', handlebars( {
  defaultLayout: 'main',
}));

app.set( 'view engine', 'handlebars' );

app.get('/', function (req, res) {
  res.status(200).render('index', {
    video: videos
  });
  console.log("== Server status", res.statusCode);
});

// app.get('/posts/:num', function (req, res, next) {
//   var postId = req.params.num;
//   if (postData[postId]) {
//     var data = [postData[postId]];
//
//     res.status(200).render('index', {
//       post: data,
//       select: data
//     });
//   } else {
//     next();
//   }
// });

app.use(express.static('public'));

// app.get('*', function (req, res) {
//   res.status(404).render('404');
//   console.log("== Server status", res.statusCode);
// });

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
