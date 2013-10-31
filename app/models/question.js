var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var QuestionSchema = new Schema ({
    question: String,
    answers: [],
    correctAnswer: String,
    type: String,
    func: Boolean
  });

  return mongoose.model('Question', QuestionSchema);
};