/*
 * SERVICES
 */

'use strict';

angular.module('myApp.services', [])
.factory('Book', ['$resource', function ($resource) {
    return $resource('http://daretodiscover.herokuapp.com/books/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
  });
}]);