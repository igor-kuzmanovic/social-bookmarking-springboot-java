(function () {
    angular.module("app")
        .factory('BookmarkService', BookmarkService);

    BookmarkService.$inject = ['$http', '$q'];

    function BookmarkService($http, $q) {

        var service = {
            saveBookmark: saveBookmark,
            deleteBookmark: deleteBookmark,
            getBookmarks: getBookmarks
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
                    def.reject("Failed to SAVE single");
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
                        def.reject("Failed to DELETE single");
                    });
            return def.promise;
        }

        function getBookmarks() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks"
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                    .error(function () {
                        def.reject("Failed to GET all");
                    });
            return def.promise;
        }

    }
} ());
