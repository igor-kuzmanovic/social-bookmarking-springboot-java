(function () {
  angular.module("app")
    .factory('CategoryService', CategoryService);

  CategoryService.$inject = ['$http', '$q'];

  function CategoryService($http, $q) {

    var service = {
      getCategories: getCategories
    }

    return service;

    function getCategories() {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "categories"
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