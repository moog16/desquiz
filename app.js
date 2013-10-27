var express = require("express");
var mongo = require('mongo');
var passport = require('passport');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
 
var app = express();

// Configuration
app.configure(function(){
  app.use(function staticsPlaceholder(req, res, next) {
    return next();
  });
  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "content-type, accept");
    res.header("Access-Control-Max-Age", 10);
    res.header('Content-Type', "text/plain");
    next();
  }

  app.set('port', process.env.PORT || 9000);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.static(path.join(__dirname,'/public')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(express.cookieParser());
    //use passport session
  app.use(passport.initialize());
  app.use(passport.session());
});

require(path.join(__dirname, '/app/models/user.js'));


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.get('/', function(req, res, next) {
  res.type('.html');
  res.render('index.html');
});

app.post('/login',
  function(req, res) {
    console.log(req.body, 'login');
    res.send();
  }
  // passport.authenticate('local', { successRedirect: '/',
                                   // failureRedirect: '/login',
                                   // failureFlash: true })
);

app.listen(app.get('port'), function() {
  console.log("Listening on " + app.get('port'));
});
