(function(){
    angular.module('app')
    .controller('UserController', UserController);

    UserController.$inject = ['UserService', '$http', '$location', '$route'];

    function UserController(UserService, $http, $location, $route) {

        var vm = this;
        vm.showLoginPage;
        vm.login = login;
        vm.logout = logout;
        vm.saveUser = saveUser;
        vm.toggleLoginPage = toggleLoginPage;
        vm.user;
        vm.error;
        vm.success;
        
        var roles = [];
        var userstatus;
        var role;
        
        init();
        
        function init() {
        	vm.showLoginPage = false;
        	userStatus = {id: 1, type:"STATUS_ACTIVE"};
            role = {id: 2, type:"ROLE_USER"};
            roles = [role];
            if (vm.user) {
                $route.reload();
            }
        }
        
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function saveUser(registration) {
        	vm.error = null;
        	if(registration == null ||
        			registration.firstName == null ||
        			registration.lastName == null ||
        			registration.email == null ||
        			registration.username == null ||
        			registration.password == null) {
        		vm.error = "Please fill in all fields!";
        		return;
        	}     	
            if(!validateEmail(registration.email)) {
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
        	if(credentials.username == null && credentials.password == null) {
        		vm.error = "Please fill in all fields!";
        		return;
        	}
        	if(credentials.username != null && credentials.password == null){
        		vm.error = "Please enter your password!";
        		return;
        	}
        	if(credentials.username == null && credentials.password != null){
        		vm.error = "Please enter your username!";
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
        
        function validateEmail(email) {
       	 	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       	 	return re.test(email);
        }
        
    };
})();
