(function() {
  angular.module('meganote.notes', ['ui.router'])
    .config(notesConfig)
    .controller('NotesController', NotesController);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
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
  }

  NotesController.$inject = ['$state', '$scope','Flash', 'NotesService'];
  function NotesController($state, $scope, Flash, NotesService) {
    $state.go('notes.form');

    NotesService.getNotes()
      .then(function() {
        $scope.notes = NotesService.notes;
      });

    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: '' };
    };

    $scope.save = function() {
      if ($scope.note._id) {
        NotesService.update($scope.note);
        Flash.create('success', 'Saved!', 1500, {class:'mega-alert'}, false);
      }
      else {
        NotesService.create($scope.note)
          .then(function(res) {
            $scope.note = res.data.note;
            Flash.create('success', 'Saved!', 1500, {class:'mega-alert'}, false);
          });
      }
    };

    $scope.edit = function(note) {
      $scope.note = angular.copy(note);
    };

    $scope.delete = function() {
      NotesService.delete($scope.note)
        .then(function() {
          $scope.clearForm();
          Flash.create('danger', 'Deleted!');
        });
    };

    $scope.clearForm();
  }
}());
