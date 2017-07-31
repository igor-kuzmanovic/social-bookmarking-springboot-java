(function () {
  angular.module("app")
    .factory('CategoryService', CategoryService);

  CategoryService.$inject = ['$http', '$q'];

  function CategoryService($http, $q) {

    var service = {
      getCategories: getCategories,
      saveCategory: saveCategory,
      deleteCategory: deleteCategory
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
        def.reject("Failed to get all categories");
      });
      return def.promise;
    }
    
    function saveCategory(category) {
      var def = $q.defer();
      var req = {
        method: category.id ? 'PUT': 'POST',
        url: "categories",
        data: category
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save a category");
      });
      return def.promise;
    }
    
    function deleteCategory(id) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "categories/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a category");
      });
      return def.promise;
    }

  }
} ());