angular.module('MovieManager').factory('Picture', ['localStorageService', function PictureFactory(localStorageService) {
  var PICTURES_KEY = 'pictures';
  var _pictures;

  var fetchAll = function(){
    _pictures = localStorageService.get(PICTURES_KEY) || [];
  };

  var find = function(movieId){
    return _.filter(_pictures, function(picture){
      return picture.movie_id == movieId
    });
  };


  var findIndexById = function(id){
    return _.findIndex(_pictures, function(picture){
      return picture.id == id;
    });
  };

  return {
    all: function(movieId) {
      fetchAll();
      return find(movieId);
    },

    add: function(movieId, fileType, data) {
      fetchAll();

      if(_pictures.length > 0){
        var id = _pictures[_pictures.length-1].id + 1;
        _pictures.push({id: id, movie_id: movieId, file_type: fileType, data: data});
      }
      else{
        _pictures.push({id: 1, movie_id: movieId, file_type: fileType, data: data});
      }
      localStorageService.set(PICTURES_KEY, _pictures);
    },

    remove: function(id) {
      fetchAll();

      var index = findIndexById(id);
      _pictures.splice(index, 1);
      localStorageService.set(PICTURES_KEY, _pictures);
    },

    removeAll: function(movieId) {
      fetchAll();

      _.each(find(movieId), function(picture){
        var index = findIndexById(picture.id);
        _pictures.splice(index, 1);
        localStorageService.set(PICTURES_KEY, _pictures);
      });
    }
  };
}]);