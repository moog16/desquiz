var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var path = require('path');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.type('html');
    var cookie = req.cookies['connect.sid'];
    User.findOne({
      'sid': cookie
    }, function(err, user) {
      if(user) {
        res.render('index.html');
      } else if(!user) {
        res.redirect('/login');
      } else if(err) {
        res.send(err);
      }
    });
  });

  app.get('/login', function(req, res, next) {
    res.type('html');
    var cookie = req.cookies['connect.sid'];
    User.findOne({
      'sid': cookie
    }, function(err, user) {
      if(user) {
        res.redirect('/');
      } else if(!user) {
        res.render('login.html');
      } else if(err)  {
        res.send(err);
      }
    });
  });

  app.post('/login', function(req, res, next) {
    User.findOne({
      'sid': req.cookies['connect.sid']
    }, function(err, user) {
      if(!user) {
        user = new User({
          email: req.body.email,
          password: req.body.pwd,
          sid: req.cookies['connect.sid']
        });
        user.save(function(err) {
          if(err) throw err;
          res.redirect('/');
        });
      } else if(user) {
        if(user.password === req.body.pwd) {
          res.redirect('/');
        } else {
          res.send('incorrect password');
        }
      } else if (err) {
        res.send('error', err);
      }
    });
  });

  app.get('/logout', function(req, res, next) {
    var cookie = req.cookies['connect.sid'];
    User.findOne({
      'sid': cookie
    }, function(err, user) {
      if(user) {
        user.sid = null;
        user.save(function(err) {
          if(err) res.send(err);
          res.redirect('/login');
        });
      } else if(err) {
        res.send(err);
      }
    });
  });

  app.get('/quiz', function (req, res, next) {
    Question.find({}, function(err, questions) {
      if(err) {
        res.send(err);
      } else if(questions) {
        res.send(questions);
      }
    });
  });

  app.post('/results', function(req, res, next) {
    User.findOne({
      'sid': req.cookies['connect.sid']
    }, function(err, user) {
      if(user) {
        user.quizResults = req.body.results;
        user.save(function(err) {
          res.send(user._id);
        });
      } else if (err) {
        res.send('error', err);
      }
    });
  });

  app.get('/results', function(req, res, next) {
    User.findOne({
      'sid': req.cookies['connect.sid']
    }, function(err, user) {
      if(user) {
        res.send(user.quizResults);
      } else if (err) {
        res.send('error', err);
      }
    })
  });

  app.get('/create', function(req, res, next) {
    var questions = require(path.join(__dirname, 'questions.json'));
    Question.remove({}, function(err) {
      if(err) throw err;
      Question.create(questions, function(err) {
        if(err) res.send(err);
      });
      res.send('success');
    });
  });

};