/*
 * CONTROLLERS
 */

'use strict';

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
    // INITIALIZATION AND NAVBAR LOGIC
  }])

  //WINES
  .controller('BooksIndexCtrl', ['$scope', '$location', 'Book', function ($scope, $location, Book) {
    $scope.book = {};
    $scope.books = [];
    $scope.newBook = {};

    $scope.books = Book.query(); // returns all the books

    $scope.createBook = function(){
        var createdBook = Book.save($scope.newBook);
        $scope.books.push(createdBook);
        $scope.newBook = {}; // clear new book object
    };

    $scope.updateBook = function(book) {
        Book.get({ id: book.id }, function() {
            Book.update({id: book.id}, book);
            book.editForm = false;
        }); 
    };

    $scope.deleteBook = function(book) {
        Book.remove({id:book.id});
        var bookIndex = $scope.books.indexOf(book);
        $scope.books.splice(bookIndex, 1);
    };

  }]);
