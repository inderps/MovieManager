describe('MovieListController', function () {

  var controller, scope, rootScope;
  var mockedMovie = {
    all: function(){
      return [1, 2];
    },
    add: function(name, year, successCallback, failureCallback){},
    edit: function(id, newName, newYear){},
    remove: function(id){}
  };

  beforeEach(module('MovieManager'));

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('Movie', mockedMovie);
    });
  });

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope.$new();
    controller = $controller('MovieListController', {
      $scope: scope,
      $rootScope: rootScope
    });
  }));

  it('should show list of movies', function () {
    expect(scope.movies).toEqual([1, 2]);
  });


  it('should add a movie', function () {
    spyOn(mockedMovie, 'add');

    scope.name = 'some-name';
    scope.year = 2015;

    scope.updateMovie();

    expect(mockedMovie.add).toHaveBeenCalledWith('some-name', 2015, jasmine.any(Function), jasmine.any(Function));
  });


  it('should let user edit a movie', function () {
    expect(scope.movieId).toEqual(-1);
    expect(scope.actionButtonLabel).toEqual('Add');

    scope.toEditMovie({id: 1, name: 'name', year: 2011},{});

    expect(scope.actionButtonLabel).toEqual('Update');
    expect(scope.name).toEqual('name');
    expect(scope.year).toEqual(2011);
    expect(scope.movieId).toEqual(1);
  });


  it('should edit a movie', function () {
    spyOn(mockedMovie, 'edit');

    scope.toEditMovie({id: 1, name: 'name', year: 2011}, {});

    scope.name = 'new-name';
    scope.year = 'new-year';

    scope.updateMovie();

    expect(mockedMovie.edit).toHaveBeenCalledWith(1, 'new-name', 'new-year');
    expect(rootScope.alertMessage).toEqual('Movie edited successfully');
  });

  it('should remove a movie', function () {
    spyOn(mockedMovie, 'remove');

    scope.removeMovie(1);

    expect(mockedMovie.remove).toHaveBeenCalledWith(1);
    expect(rootScope.alertMessage).toEqual('Movie removed successfully');
  });

});