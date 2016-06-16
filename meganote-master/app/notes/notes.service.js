(function() {
  angular.module('meganote.notes')
    .service('NotesService', NotesService);

  NotesService.$inject = ['$http'];
  function NotesService($http) {
    var service = this;
    service.notes = [];

    service.getNotes = function() {
      var notesPromise = $http.get('https://meganote.herokuapp.com/notes');

      notesPromise.then(function(res) {
        service.notes = res.data;
      });

      return notesPromise;
    };

    service.create = function(note) {
      var notesPromise = $http.post('https://meganote.herokuapp.com/notes', {
        note: note
      });

      notesPromise.then(function(res) {
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.update = function(note) {
      var notesPromise = $http.put('https://meganote.herokuapp.com/notes/' + note._id, {
        note: note
      });

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
        service.notes.unshift(res.data.note);
      });

      return notesPromise;
    };

    service.delete = function(note) {
      var notesPromise = $http.delete('https://meganote.herokuapp.com/notes/' + note._id);

      notesPromise.then(function(res) {
        service.removeById(res.data.note._id);
      });

      return notesPromise;
    };

    service.removeById = function(id) {
      for (var i=0; i < service.notes.length; i++) {
        if (service.notes[i]._id === id) {
          return service.notes.splice(i, 1);
        }
      }
    };
  }
}());

//$http.get('https://meganote.herokuapp.com/notes/')
  //.success(function(note) {
    //console.log("Your note is: " + note);
  //})
  //.error(function(response, status) {
    //console.log("The request failed with response " + response + " and status code " + status);
  //};
