var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var path = require('path');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.type('html');
    res.render('index.html');
  });

  app.get('/login', function(req, res, next) {
    res.type('html');
    res.render('login.html');
  });

  app.post('/login', function(req, res, next) {
    User.findOne({
      'email': req.body.email
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
  })

  app.get('/quiz', function (req, res, next) {
    Question.find({}, function(err, questions) {
      if(err) {
        throw err;
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

  app.post('/user', function(req, res, next) {
    User.findOne({
      'email': req.body.username
    }, function(err, user) {
      if(err) {
        throw err;
      } else if(!user) {
        user = new User({
          email: req.body.username,
          password: req.body.pass
        });
        user.save(function(err) {
          if(err) throw err;
          res.send(user._id);
        });
      } else {
        res.send(user._id);
      }
    });
  });

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