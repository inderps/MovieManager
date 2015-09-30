describe('PictureListController', function () {

  var controller, scope, rootScope;

  var mockedPicture = {
    add: function(){},
    remove: function(){},
    all: function(id){}
  };

  beforeEach(module('MovieManager'));

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('Picture', mockedPicture);
    });
  });

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    rootScope = $rootScope.$new();
    controller = $controller('PictureListController', {
      $scope: scope,
      $rootScope: rootScope
    });
    rootScope.selectedMovieId = 1;
  }));

  it('should add a picture', function () {
    spyOn(mockedPicture, 'all');
    spyOn(mockedPicture, 'add');

    scope.picture = {
      filetype: 'images/png',
      base64: 'some-data'
    };

    scope.uploadPicture(1);

    expect(mockedPicture.add).toHaveBeenCalledWith(1, 'images/png', 'some-data');
    expect(mockedPicture.all).toHaveBeenCalledWith(1);
    expect(rootScope.alertMessage).toEqual('Picture added successfully');
  });

  it('should remove a picture', function () {
    spyOn(mockedPicture, 'all');
    spyOn(mockedPicture, 'remove');

    scope.removePicture(1);

    expect(mockedPicture.remove).toHaveBeenCalledWith(1);
    expect(mockedPicture.all).toHaveBeenCalledWith(1);
    expect(rootScope.alertMessage).toEqual('Picture removed successfully');
  });

});