(function () {
  angular.module("app")
    .factory('BookmarkService', BookmarkService);

  BookmarkService.$inject = ['$http', '$q'];

  function BookmarkService($http, $q) {

    var service = {
      saveBookmark: saveBookmark,
      deleteBookmark: deleteBookmark,
      getBookmarks: getBookmarks,
      getUserBookmarks: getUserBookmarks,
      getPublicBookmarks: getPublicBookmarks,
      importBookmark: importBookmark,
      rateBookmark: rateBookmark,
      getBookmarkComments: getBookmarkComments
    }

    return service;

    function saveBookmark(bookmark) {
      var def = $q.defer();
      var req = {
        method: bookmark.id ? 'PUT': 'POST',
        url: "bookmarks",
        data: bookmark
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save a bookmark");
      });
      return def.promise;
    }

    function deleteBookmark(id) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "bookmarks/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a bookmark");
      });
      return def.promise;
    }
    
    function getBookmarks() {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "bookmarks"
      }
      $http(req)
        .success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get all bookmarks");
      });
      return def.promise;
    }

    function getUserBookmarks(username) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "bookmarks/user/" + username
      }
      $http(req)
        .success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get user bookmarks");
      });
      return def.promise;
    }

    function getPublicBookmarks(username) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "bookmarks/public/" + username
      }
      $http(req)
        .success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get public bookmarks");
      });
      return def.promise;
    }

    function importBookmark(username, bookmarkId) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "bookmarks/" + username + "/" + bookmarkId
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function (){
        def.reject("Failed to import a bookmark");
      })
      return def.promise;
    }
    
    function rateBookmark(bookmarkId, rating, isNewRating) {
      var def = $q.defer();
      var req = {
        method: isNewRating ? 'POST' : 'PUT',
        url: "rating/" + bookmarkId,
        data: {"rate" : rating}
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to rate a bookmark");
      });
      return def.promise;
    }
    
    function getBookmarkComments(bookmark) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "bookmarks/" + bookmark.id + "/comments"
      }
      $http(req)
        .success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get comments for selected bookmark");
      });
      return def.promise;
    }

  }
} ());
