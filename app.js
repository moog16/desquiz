var express = require("express");
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deskQuiz');

var app = express();

// Configuration
require(path.join(__dirname, '/app/config.js'))(app, mongoose);

// Models
require(path.join(__dirname, '/app/models/user.js'))();
require(path.join(__dirname, '/app/models/question.js'))();

// Routes
require(path.join(__dirname, '/app/routes.js'))(app);

app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
