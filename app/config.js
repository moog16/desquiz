var express = require('express');
var path = require('path');
var MongoStore = require('connect-mongo')(express);

module.exports = function(app, mongoose) {
  app.configure(function(){
    app.use(function staticsPlaceholder(req, res, next) {
      return next();
    });

    app.set('port', process.env.PORT || 9000);
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.static(path.join(__dirname, '/../public')));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ 
      secret: 'keyboard',
      store: new MongoStore({
        url: 'mongodb://localhost/deskQuiz',
        collection: 'sessions',
        mongoose_connection: mongoose.connection
      })
    }));
  });
};