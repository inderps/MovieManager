angular.module('MovieManager').controller('PictureListController', function($scope, $rootScope, Picture){

  $scope.uploadPicture = function(movieId){
    Picture.add(movieId, $scope.picture.filetype, $scope.picture.base64);
    $rootScope.pictures = Picture.all($rootScope.selectedMovieId);
    $rootScope.alertMessage = 'Picture added successfully';
  };

  $scope.removePicture = function(pictureId){
    Picture.remove(pictureId);
    $rootScope.pictures = Picture.all($rootScope.selectedMovieId);
    $rootScope.alertMessage = 'Picture removed successfully';
  };
});