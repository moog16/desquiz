(function() {
  'use strict';
  angular.module('deskQuizApp.quizMaterial.service', []).factory('quizMaterial', [
    '$http', '$q', function($http, $q) {
      var getQuestions, getReq, getResults, postAnswers, savedQuestions, url;
      url = 'http://localhost:9000';
      savedQuestions = null;
      getReq = function(resource) {
        var deferred;
        deferred = $q.defer();
        $http.get(url + resource).success(function(data, status, headers, config) {
          console.log(data);
          if (resource === '/quiz') {
            savedQuestions = data;
          }
          return deferred.resolve(data);
        }).error(function(err, status, headers, config) {
          console.log(err);
          return deferred.reject(err);
        });
        return deferred.promise;
      };
      postAnswers = function(quizTakerResults) {
        return $http.post(url + '/results', quizTakerResults).success(function(data, status, headers, config) {
          return console.log(data);
        }).error(function(err, status, headers, config) {
          return console.log(err, 'error');
        });
      };
      getQuestions = function() {
        if (!savedQuestions) {
          return getReq('/quiz');
        } else {
          return savedQuestions;
        }
      };
      getResults = function() {
        return getReq('/results');
      };
      return {
        postAnswers: postAnswers,
        getQuestions: getQuestions,
        getResults: getResults
      };
    }
  ]);

}).call(this);
