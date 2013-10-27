var mongoose = require('mongoose');
var Question = mongoose.model('Question');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.type('.html');
    // res.redirect(path.join(__dirname, '/views/login.html'))
    res.render('index.html');
  });

  app.get('/quiz', function (req, res, next) {
    Question.find({}, function(err, questions) {
      if(err) {
        throw err;
      } else if(questions) {
        res.send(questions);
      }
    });
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        return res.redirect('/quiz')
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/quiz');
      });
    })(req, res, next);
  });


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
};