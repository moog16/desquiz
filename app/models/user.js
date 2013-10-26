var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var UserSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    quiz: {}
  });

  return mongoose.model('User', UserSchema);
};