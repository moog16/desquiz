'use strict'

angular.module('deskQuizApp.results.controller', [])
  .controller 'ResultsCtrl', ['$scope', 'quizMaterial', ($scope, quizMaterial) ->

    quizMaterial.getResults()
    .then (results) ->
      quizMaterial.getQuestions()
      .then (questions) ->
        $scope.results = questionAnswerMap results, questions

    questionAnswerMap = (results, questions) ->
      newResults = []
      for result in results
        do (result) ->
          questionId = result.question
          found = false
          index = 0
          while !found or index is questions.length-1
            do () ->
              question = questions[index]
              if questionId is question._id
                correctAnswerInd = question.correctAnswer
                newResults.push(
                  answer: result.answer
                  question: question.question
                  correctAnswer: question.answers[correctAnswerInd])
                index = 0
                found = true
              index++
      newResults
  ]
  