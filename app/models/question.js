var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var QuestionSchema = new Schema ({
    question: String,
    answers: []
  });

  return mongoose.model('Question', UserSchema);
};