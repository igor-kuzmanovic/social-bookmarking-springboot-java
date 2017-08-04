(function () {
  angular.module("app")
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$q'];

  function UserService($http, $q) {

    var service = {
      saveUser: saveUser,
      getUsers: getUsers,
      blockUnblockUser: blockUnblockUser,
      deleteUser: deleteUser
    }

    return service;

    function saveUser(user) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "users",
        data: user
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save a user");
      });
      return def.promise;
    }

    function getUsers() {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "users"
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get all users");
      });
      return def.promise;
    }

    function blockUnblockUser(id) {
      var def = $q.defer();
      var req = {
        method: 'PUT',
        url: "users/block/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to block/unblock a user");
      });
      return def.promise;
    }

    function deleteUser(id) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "users/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a user");
      });
      return def.promise;
    }

  }
} ());
