var express = require('express');
var path = require('path');
var flash = require('connect-flash');

module.exports = function(app) {
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
    app.use(express.static(path.join(__dirname,'/../public')));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    // app.use(allowCrossDomain);
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard' }));
    app.use(flash());
  });
};