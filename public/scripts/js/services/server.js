(function() {
  'use strict';
  angular.module('deskQuizApp.server.service', []).factory('server', [
    '$http', '$q', function($http, $q) {
      var getQuestions, getReq, getResults, sendAnswers, url;
      url = 'http://localhost:9000';
      getReq = function(resource) {
        var deferred;
        deferred = $q.defer();
        $http.get(url + resource).success(function(data, status, headers, config) {
          return deferred.resolve(data);
        }).error(function(err, status, headers, config) {
          return console.log(err);
        });
        return deferred.promise;
      };
      sendAnswers = function() {
        return $http.post(url + '/results').success(function(data, status, headers, config) {
          return console.log(data);
        }).error(function(err, status, headers, config) {
          return console.log(err);
        });
      };
      getQuestions = function() {
        return getReq('/quiz');
      };
      getResults = function() {
        return getReq('/results');
      };
      return {
        sendAnswers: sendAnswers,
        getQuestions: getQuestions,
        getResults: getResults
      };
    }
  ]);

}).call(this);
