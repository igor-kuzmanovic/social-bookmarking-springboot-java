(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                 templateUrl: '/views/home.html',
                 controller: 'BookmarkController',
                 controllerAs: 'vm'
            })
            .when('/home', {
                templateUrl: '/views/home.html',
                controller: 'BookmarkController',
                controllerAs: 'vm'
            })
            .when('/search', {
                templateUrl: '/views/search.html',
                controller: 'SearchController',
                controllerAs: 'vm'
            })
            .when('/manage', {
                templateUrl: '/views/manage.html',
                controller: 'BookmarkController',
                controllerAs: 'vm'
            })
            .otherwise('/');
    }
}());
