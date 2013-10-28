var mongoose = require('mongoose');
var passport = require('passport');
var Question = mongoose.model('Question');
var path = require('path');

module.exports = function(app) {

  app.get('/', ensureAuthenticated, function(req, res, next) {
    res.type('.html');
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

  app.post('/submitQA', function(req, res, next) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {

    });
    res.send('success');
  });



  app.get('/login', function(req, res, next) {
    res.render(path.join(__dirname, '/../public/views/login.html'));
  });

  app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
      res.redirect('/');
  });


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
};



  // app.get('/create', function(req, res, next) {
  //   Question.find({}, function (err, question) {

  //     question = new Question({
  //       type:'multi',
        // type: 'fillin',
        // question : 'Which is not an advantage of using a closure?',
        // answers : [
        // 'Prevent pollution of global scope',
        // 'Encapsulation',
        // 'Private properties and methods',
        // "Allow conditional use of ‘strict mode’"
        // ]
        // question: 'To create a columned list of two­line email subjects and dates for a master­detail view, which are the most semantically correct?',
        // answers: [
        //   '<div>+<span>',
        //   '<tr>+<td>',
        //   '<ul>+<li>',
        //   '<p>+<br>', 
        //   'none of these',
        //   'all of these'
        // ]
        // question: 'To pass an array of strings to a function, you should not use...',
        // answers: [
        //   'fn.apply(this, stringsArray)',
        //   'fn.call(this, stringsArray)',
        //   'fn.bind(this, stringsArray)'
        // ]
        // question: '____ and ____ would be the HTML tags you would use to display a menu item and its description.',
        // answers: []
        // question: 'Given this: \n angular.module(‘myModule’).service(‘myService’,function() { \n'+
        //   'var message = “Message one!”\n var getMessage = function() {\nreturn this.message\n};'+
        //   'this.message = “Message two!”\nthis.getMessage = function() { return message }\n'+
        //   'function() {\n{\ngetMessage: getMessage,\nmessage: “Message three!”\n};\n};\n};\n'+
        //   'Which message will be returned by injecting this service and executing “myService.getMessage()”',
        // answers: [1,2,3]
  //     });
  //     question.save(function(err) {
  //       if(err) throw err;
  //     });


  //   })
  //   res.send('ssuccss');
  // })