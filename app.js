var express = require("express");
var mongo = require('mongo');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
 
var app = express();

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Configuration
require(path.join(__dirname, '/app/config.js'))(app);

var User = require(path.join(__dirname, '/app/models/user.js'));
var Question = require(path.join(__dirname, '/app/models/question.js'));



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

require(path.join(__dirname, '/app/routes.js'))(app);

app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
