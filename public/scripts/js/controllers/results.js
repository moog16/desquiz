(function() {
  'use strict';
  angular.module('deskQuizApp.results.controller', []).controller('ResultsCtrl', [
    '$scope', 'server', function($scope, server) {
      return server.getResults;
    }
  ]);

}).call(this);
