var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var UserSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    quizResults: {}
  });

  return mongoose.model('User', UserSchema);
};