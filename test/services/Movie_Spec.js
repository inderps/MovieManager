describe('Movie', function () {

  var Movie;

  var mockedLocalStorage = {
    movies: [],
    get: function(key){
      return this.movies;
    },
    set: function(key, value){
      this.movies = value;
    }
  };

  beforeEach(module('MovieManager'));

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('localStorageService', mockedLocalStorage);
    });
    mockedLocalStorage.movies = [{id: 1, name: 'Terminator', year: 1992}, {id: 2, name: 'Titanic', year: 1997}];
  });

  beforeEach(inject(function (_Movie_) {
    Movie = _Movie_;
  }));


  describe("All", function() {
    it('should return all movies', function () {
      expect(Movie.all()).toEqual([{id: 1, name: 'Terminator', year: 1992},
        {id: 2, name: 'Titanic', year: 1997}]);
    });
  });

  describe("Add", function() {
    it('should add a movie', function () {
      Movie.add('Jurassic World', 2015, function(){

        expect(Movie.all()).toEqual([{id: 1, name: 'Terminator', year: 1992},
          {id: 2, name: 'Titanic', year: 1997},
          {id: 3, name: 'Jurassic World', year: 2015 }]);
      }, function(){});
    });

    it('should add a movie with id 1 if there is no movie present', function () {
      mockedLocalStorage.movies = [];

      Movie.add('Jurassic World', 2015, function(){
        expect(Movie.all()).toEqual([{id: 1, name: 'Jurassic World', year: 2015 }]);
      }, function(){});
    });

    it('should add a same movie with different year', function () {
      Movie.add('Terminator', 2015, function(){

        expect(Movie.all()).toEqual([{id: 1, name: 'Terminator', year: 1992},
          {id: 2, name: 'Titanic', year: 1997},
          {id: 3, name: 'Terminator', year: 2015 }]);
      }, function(){});
    });

    it('should add a different movie with same year', function () {
      Movie.add('Aladdin', 1992, function(){

        expect(Movie.all()).toEqual([{id: 1, name: 'Terminator', year: 1992},
          {id: 2, name: 'Titanic', year: 1997},
          {id: 3, name: 'Aladdin', year: 1992 }]);
      }, function(){});
    });

    it('should not add a duplicate movie', function () {
      Movie.add('Titanic', 1997, function(){}, function(errorMessage){
        expect(errorMessage).toEqual('Movie already exists');
      });
    });
  });


  describe("Edit", function() {
    it('should edit a movie', function () {
      Movie.edit(1, 'Jurassic World', 2015, function(){

        expect(Movie.all()).toEqual([{id: 1, name: 'Jurassic World', year: 2015},
          {id: 2, name: 'Titanic', year: 1997}]);
      });
    });
  });

  describe("Remove", function() {
    it('should remove a movie', function () {
      Movie.remove(1, function(){
        expect(Movie.all()).toEqual([{id: 2, name: 'Titanic', year: 1997}]);
      });
    });
  });
});