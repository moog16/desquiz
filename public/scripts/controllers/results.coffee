'use strict'

angular.module('deskQuizApp.results.controller', [])
  .controller 'ResultsCtrl', ['$scope', 'quizMaterial', 'user', ($scope, quizMaterial, user) ->
    $scope.correct = 0

    quizMaterial.getResults()
    .then (results) ->
      quizMaterial.getQuestions()
      .then (questions) ->
        $scope.results = questionAnswerMap results, questions
        $scope.score = (($scope.correct/questions.length)*100).toFixed(1)

    $scope.logout = () ->
      user.logout()

    checkFillin = (result, questions) ->
      answers =  JSON.parse questions.correctAnswer
      match = true
      for result in result.answer
        do () ->
          if not match
            return false
          match = false
          for answer in answers
            do () ->
              if result is answer
                match = true
      match

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
                correctAnswer = question.answers[correctAnswerInd]
                correct = false
                if question.type is 'fillin'
                  correct = checkFillin result, question
                  correctAnswer = JSON.parse question.correctAnswer
                if result.answer is correctAnswer or correct
                  $scope.correct++
                  correct = true

                newResults.push(
                  answer: result.answer
                  question: question.question
                  correctAnswer: correctAnswer
                  correct: correct)
                index = 0
                found = true
              index++
      newResults
  ]
  