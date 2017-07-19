(function(){
    angular.module('app')
    .controller('UserController', UserController);

    UserController.$inject = ['UserService', '$location', '$http', '$route'];

    function UserController(UserService, $location, $http, $route) {

        var vm = this;
        vm.registration = false;
        vm.login = login;
        vm.saveUser = saveUser;
        vm.switchLogin = switchLogin;
        vm.error;

        var userStatus = {id: 1, type:"STATUS_ACTIVE"};
        var role = {id: 2, type:"ROLE_USER"};
        vm.roles = [role];

        function saveUser(user) {
        	if(user == null ||
        			user.firstName == null ||
        			user.lastName == null ||
        			user.email == null ||
        			user.username == null ||
        			user.password == null) {
        		vm.error = "Please fill out all fields!";
        		return;
        	}     	
            if(!user.email.includes('@')) {
            	vm.error = "Invalid email format!"
            	return;
            }
            user.userStatus = userStatus;
            user.roles = vm.roles;
            UserService.saveUser(user).then(handleSuccessUser,
            		function(error){
            	vm.error = "Username already exists!";
            });
        }

        function handleSuccessUser(data, status) {
            vm.error = null;
            alert("User created!");
        }

        function switchLogin() {
            vm.registration = !vm.registration;
        }

        function login() {
        	if(vm.credentials == null ||
        			vm.credentials.username == null ||
        			vm.credentials.password == null) {
        		vm.error = "Please fill out all fields!";
        		return;
        	} 
            var base64Credential = btoa(vm.credentials.username + ':' + vm.credentials.password);
            $http.get('users/login', {
                headers: {
                    'Authorization': 'Basic ' + base64Credential
                }
            }).success(function (response) {
                vm.credentials.password = null;
                vm.message = '';
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
                vm.user = response;
                vm.error = null;
                alert("Logged in!");
            }).error(function (error) {               
                vm.error = 'Bad credentials!';
            });
        }
        
        function logout() {
            $http.defaults.headers.common['Authorization'] = null;
            delete vm.user;
            delete vm.error;
        }

    };
})();
