var express = require("express");
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deskQuiz');

var app = express();

// Configuration
require(path.join(__dirname, '/app/config.js'))(app, mongoose);

// Models
require(path.join(__dirname, '/app/models/user.js'))();
require(path.join(__dirname, '/app/models/question.js'))();



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

// Routes
require(path.join(__dirname, '/app/routes.js'))(app);

app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
