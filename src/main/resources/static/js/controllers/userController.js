(function(){
    angular.module('app')
    .controller('UserController', UserController);   
    
    UserController.$inject = ['UserService', '$location', '$http', '$route'];
    
    function UserController(UserService, $location, $http, $route) {
        
        var vm = this;
        vm.registration = false;
        vm.login = login;
        vm.saveUser = saveUser;
        vm.showLogin = showLogin;
        
        var userStatus = {id: 1, type:"STATUS_ACTIVE"};
        var role = {id: 2, type:"ROLE_USER"};
        vm.roles = [role];

        function saveUser(user){
            user.userStatus = userStatus;
            user.roles = vm.roles;
            UserService.saveUser(user).then(handleSuccessUser,
                function(error){
                    alert("Username already exists!");
                });
        }
        
        function handleSuccessUser(data, status) {
            alert("User created!");
        }

        function showLogin() {
            vm.registration = !vm.registration;
        }

        function login(credentials) {
            // creating base64 encoded String from username and password
            var base64Credential = btoa(credentials.username + ':' + credentials.password);

            // calling GET request for getting the user details
            $http.get('user', {
                headers: {
                    // setting the Authorization Header
                    'Authorization': 'Basic ' + base64Credential
                }
            }).success(function (response) {
                vm.credentials.password = null;
                vm.message = '';
                // setting the same header value for all request calling from this app
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
                vm.user = response;
            }).error(function (error) {
                vm.error = 'Bad credentials!';
            });
        }

    };
})();