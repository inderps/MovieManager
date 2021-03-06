angular.module('MovieManager').controller('MovieListController', function($scope, $rootScope, Movie, Picture){
  var reset = function(){
    $scope.actionButtonLabel = 'Add';
    $scope.movieId = -1;
    $scope.name = '';
    $scope.year = '';
    $scope.movies = Movie.all();
    $rootScope.selectedMovieId = $scope.movies[0].id;
    $rootScope.pictures = Picture.all($rootScope.selectedMovieId);
  };

  reset();

  $scope.updateMovie = function(){
    if($scope.movieId == -1){
      Movie.add($scope.name, $scope.year, function(){
        $rootScope.alertMessage = 'Movie added successfully';
        reset();
      }, function(errorMessage){
        $rootScope.alertMessage = errorMessage;
      });
    }
    else{
      Movie.edit($scope.movieId, $scope.name, $scope.year);
      $rootScope.alertMessage = 'Movie edited successfully';
      reset();
    }
  };

  $scope.toEditMovie = function(movie, form){
    console.log(form);
    form.$dirty = true;
    $scope.actionButtonLabel = 'Update';
    $scope.movieId = movie.id;
    $scope.name = movie.name;
    $scope.year = movie.year;
  };

  $scope.removeMovie = function(id){
    Movie.remove(id);
    $rootScope.alertMessage = 'Movie removed successfully';
    reset();
  };

  $scope.setCurrentMovie = function(movieId){
    $rootScope.selectedMovieId = movieId;
    $rootScope.pictures = Picture.all($rootScope.selectedMovieId);
  };

  $scope.closeAlert = function(){
    $rootScope.alertMessage = null;
  }
});