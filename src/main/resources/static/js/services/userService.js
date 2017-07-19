(function () {
    angular.module("app")
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];

    function UserService($http, $q) {

        var service = {
            saveUser: saveUser,
        }

        return service;

        function saveUser(user) {
            var def = $q.defer();
            var req = {
                method: 'POST',
                url: "users",
                data: user}
            $http(req).success(function (data) {
                def.resolve(data);
            })
                .error(function () {
                    def.reject("Failed");
                });
            return def.promise;
        }

    }
} ());
