(function(){
    angular.module('app')
    .controller('UserController', UserController);

    UserController.$inject = ['UserService', '$location', '$http', '$route'];

    function UserController(UserService, $location, $http, $route) {

        var vm = this;
        vm.showLoginPage = false;
        vm.login = login;
        vm.logout = logout;
        vm.saveUser = saveUser;
        vm.toggleLoginPage = toggleLoginPage;
        vm.error;
        vm.success;

        var userStatus = {id: 1, type:"STATUS_ACTIVE"};
        var role = {id: 2, type:"ROLE_USER"};
        vm.roles = [role];

        function saveUser(registration) {
        	vm.error = null;
        	if(registration == null ||
        			registration.firstName == null ||
        			registration.lastName == null ||
        			registration.email == null ||
        			registration.username == null ||
        			registration.password == null) {
        		vm.error = "Please fill out all fields!";
        		return;
        	}     	
            if(!registration.email.includes('@')) {
            	vm.error = "Invalid email format!"
            	return;
            }
            registration.userStatus = userStatus;
            registration.roles = vm.roles;
            UserService.saveUser(registration).then(handleSuccessUser,
            		function(error){
            	vm.error = "Username already exists!";
            });
        }

        function handleSuccessUser() {
            vm.error = null;
            vm.showLoginPage = true;
            vm.registration = null;
            vm.success = "User created!";
        }

        function toggleLoginPage() {
        	vm.registration = null;
        	vm.credentials = null;      	
            vm.error = null;
            if (vm.showLoginPage)
        		vm.success = null;
        	vm.showLoginPage = !vm.showLoginPage;       	
        }

        function login(credentials) {
        	vm.error = null;
        	vm.success = null;
        	if(credentials == null ||
        			credentials.username == null ||
        			credentials.password == null) {
        		vm.error = "Please fill out all fields!";
        		return;
        	} 
            var base64Credential = btoa(credentials.username + ':' + credentials.password);
            $http.get('users/login', {
                headers: {
                    'Authorization': 'Basic ' + base64Credential
                }
            }).success(function (response) {
            	credentials.username = null;
                credentials.password = null;
                vm.message = '';
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
                vm.user = response;
                vm.error = null;
            }).error(function (error) {               
                vm.error = 'Bad credentials!';
            });
        }
        
        function logout() {
        	vm.showLoginPage = false;
            $http.defaults.headers.common['Authorization'] = null;
            delete vm.user;
            delete vm.error;
        }
    };
})();
