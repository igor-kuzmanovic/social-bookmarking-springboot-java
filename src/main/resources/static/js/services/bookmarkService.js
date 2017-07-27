(function () {
  angular.module("app")
    .factory('BookmarkService', BookmarkService);

  BookmarkService.$inject = ['$http', '$q'];

  function BookmarkService($http, $q) {

    var service = {
      saveBookmark: saveBookmark,
      deleteBookmark: deleteBookmark,
      getUserBookmarks: getUserBookmarks,
      getPublicBookmarks: getPublicBookmarks,
      importBookmark: importBookmark
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
        def.reject("Failed to save");
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
        def.reject("Failed to delete");
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
        def.reject("Failed to get by username");
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
        def.reject("Failed to get public");
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
        def.reject("Failed to import");
      })
      return def.promise;
    }

  }
} ());
