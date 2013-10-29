(function() {
  'use strict';
  angular.module('deskQuizApp.user.service', []).factory('user', [
    '$http', function($http) {
      return {
        logout: function() {
          var url;
          url = 'http://localhost:9000';
          return $http.get(url + '/logout').success(function(data, status, headers, config) {
            console.log(data);
            return window.location.reload();
          }).error(function(err, status, headers, config) {
            return console.log(err);
          });
        }
      };
    }
  ]);

}).call(this);
