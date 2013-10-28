(function() {
  'use strict';
  angular.module('deskQuizApp.server.service', []).factory('server', [
    '$http', '$q', function($http, $q) {
      var getQuestions, getResults, sendAnswers, url;
      url = 'http://localhost:9000';
      sendAnswers = function() {
        return $http.post(url + '/quiz').success(function(res) {
          return console.log(res);
        }).error(function(error) {
          return console.log(error);
        });
      };
      getQuestions = function() {
        var deferred;
        deferred = $q.defer();
        $http.get(url + '/quiz').success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(err, status, headers, config) {
          return console.log(err);
        });
        return deferred.promise;
      };
      getResults = function() {};
      return {
        sendAnswers: sendAnswers,
        getQuestions: getQuestions,
        getResults: getResults
      };
    }
  ]);

}).call(this);
