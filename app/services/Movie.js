angular.module('MovieManager').factory('Movie', ['localStorageService', function MovieFactory(localStorageService) {
  var MOVIES_KEY = 'movies';
  var _movies;

  var find = function(name, year){
    for(var i=0; i<_movies.length; i++){
      if(_movies[i].name == name && _movies[i].year == year){
        return _movies[i];
      }
    }
    return null;
  };


  var findIndexById = function(id){
    for(var i=0; i<_movies.length; i++){
      if(_movies[i].id == id){
        return i;
      }
    }
    return -1;
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

    edit: function(id, newName, newYear, callback) {
      this.all();
      var index = findIndexById(id);
      _movies[index].name = newName;
      _movies[index].year = newYear;
      localStorageService.set(MOVIES_KEY, _movies);
      callback();
    },

    remove: function(id, callback) {
      this.all();
      var index = findIndexById(id);
      _movies.splice(index, 1);
      localStorageService.set(MOVIES_KEY, _movies);
      callback();
    }
  };
}]);