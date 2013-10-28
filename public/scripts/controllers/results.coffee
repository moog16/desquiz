'use strict'

angular.module('deskQuizApp.results.controller', [])
  .controller 'ResultsCtrl', ['$scope', 'server', ($scope, server) ->
    server.getResults

  ]
