/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  //WINES
  .controller('WinesIndexCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    $scope.wines = [];
    $scope.wine = {};

    $http.get('http://daretodiscover.herokuapp.com/wines')
      .then(function(response) {
        $scope.wines = response.data;
      });

    $scope.createWine = function() {
      $http.post('http://daretodiscover.herokuapp.com/wines', $scope.wine)
        .then(function(response) {
          var newWine = response.data;
          $scope.wine = {};
          $scope.wines.unshift(newWine);
        });
    };

    $scope.updateWine = function(wine) {
      $http.put('http://daretodiscover.herokuapp.com/wines/' + wine.id, wine)
        .then(function(response) {
          wine.editForm = false;
        });
    };

    $scope.deleteWine = function(wine) {
      $http.delete('http://daretodiscover.herokuapp.com/wines/' + wine.id)
        .then(function(response) {
          var wineIndex = $scope.wines.indexOf(wine);
          $scope.wines.splice(wineIndex, 1);
        });
    };


  }])

  .controller('WinesCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
    $scope.wine = {};

    $http.get('http://daretodiscover.herokuapp.com/wines/' + $stateParams.id)
      .then(function(response) {
        $scope.wine = response.data;
      });
  }]);
