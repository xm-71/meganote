
angular.module('meganote.notes', [
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider

  .state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController'
    })

  .state('notes.form', {
    url: '/:noteId',
    templateUrl: 'notes/notes-form.html'
  });
})

.controller('NotesController', function($scope) {
  $scope.notes = [];
  $scope.note = {
    title: 'This is my note',
    body: 'This is the body of that note.'
  };

  $scope.save = function() {
    $scope.notes.push($scope.note);
    $scope.note = {
      title:'', 
      body:''
    };
  }
});
