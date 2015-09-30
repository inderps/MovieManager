describe('Picture', function () {

  var Picture;

  var mockedLocalStorage = {
    pictures: [],
    get: function(key){
      return this.pictures;
    },
    set: function(key, value){
      this.pictures = value;
    }
  };

  beforeEach(module('MovieManager'));

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('localStorageService', mockedLocalStorage);
    });
    mockedLocalStorage.pictures = [{id: 1, movie_id: 1, file_type: 'image/png', data: 'random-data'},
                                    {id: 2, movie_id: 1, file_type: 'image/jpeg', data: 'random-data'},
                                    {id: 3, movie_id: 2, file_type: 'image/gif', data: 'random-data'}];
  });

  beforeEach(inject(function (_Picture_) {
    Picture = _Picture_;
  }));


  describe("All", function() {
    it('should return all pictures for a movie', function () {
      expect(Picture.all(1)).toEqual([{id: 1, movie_id: 1, file_type: 'image/png', data: 'random-data'},
        {id: 2, movie_id: 1, file_type: 'image/jpeg', data: 'random-data'}]);

      expect(Picture.all(2)).toEqual([{id: 3, movie_id: 2, file_type: 'image/gif', data: 'random-data'}]);
    });
  });

  describe("Add", function() {
    it('should add a picture for a movie', function () {
      Picture.add(1, 'image/gif', 'data');

      expect(Picture.all(1)).toEqual([{id: 1, movie_id: 1, file_type: 'image/png', data: 'random-data'},
        {id: 2, movie_id: 1, file_type: 'image/jpeg', data: 'random-data'},
        {id: 4, movie_id: 1, file_type: 'image/gif', data: 'data'}]);
    });

    it('should add a picture with id 1 if there is no picture present', function () {
      mockedLocalStorage.pictures = [];

      Picture.add(1, 'image/gif', 'data');

      expect(Picture.all(1)).toEqual([{id: 1, movie_id: 1, file_type: 'image/gif', data: 'data'}])
    });
  });

  describe("RemoveAll", function() {
    it('should remove all pictures for a movie', function () {
      Picture.removeAll(1);

      expect(Picture.all(1)).toEqual([]);
    });
  });

  describe("Remove", function() {
    it('should remove a picture', function () {
      Picture.remove(1);
      expect(Picture.all(1)).toEqual([{id: 2, movie_id: 1, file_type: 'image/jpeg', data: 'random-data'}]);
    });
  });
});