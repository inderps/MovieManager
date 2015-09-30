angular.module('MovieManager').factory('Movie', ['localStorageService', function MovieFactory(localStorageService) {
  var MOVIES_KEY = 'movies';
  var _movies;

  var find = function(name, year){
    return _.find(_movies, function(movie){
      return movie.name == name && movie.year == year;
    });
  };


  var findIndexById = function(id){
    return _.findIndex(_movies, function(movie){
      return movie.id == id;
    });
  };

  return {
    all: function() {
      _movies = localStorageService.get(MOVIES_KEY) || [];
      return _movies;
    },

    add: function(name, year, successCallback, failureCallback) {
      this.all();

      if(find(name, year)){
        failureCallback('Movie already exists');
        return;
      }

      if(_movies.length > 0){
        var id = _movies[_movies.length-1].id + 1;
        _movies.push({id: id, name: name, year: year});
      }
      else{
        _movies.push({id: 1, name: name, year: year});
      }
      localStorageService.set(MOVIES_KEY, _movies);
      successCallback();
    },

    edit: function(id, newName, newYear) {
      this.all();
      var index = findIndexById(id);
      _movies[index].name = newName;
      _movies[index].year = newYear;
      localStorageService.set(MOVIES_KEY, _movies);
    },

    remove: function(id) {
      this.all();
      var index = findIndexById(id);
      _movies.splice(index, 1);
      localStorageService.set(MOVIES_KEY, _movies);
    }
  };
}]);