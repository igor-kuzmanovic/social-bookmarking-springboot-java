(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/search', {
                templateUrl: '/views/search.html',
                controller: 'SearchController',
                controllerAs: 'vm'
            })
    }
}());