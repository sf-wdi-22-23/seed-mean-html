/*
 * ANGULAR APP.JS
 */

'use strict';

angular.module('myApp', ['ui.router',
                         'myApp.controllers'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('wines', {
        url: "/",
        templateUrl: 'templates/wines-index',
        controller: 'WinesIndexCtrl'
      })
      .state('winesDetails', {
        url: '/:id',
        templateUrl: 'templates/wines',
        controller: 'WinesCtrl'
      });

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
  }]);
