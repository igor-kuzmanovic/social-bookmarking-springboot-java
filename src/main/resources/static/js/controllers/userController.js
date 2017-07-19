(function(){
    angular.module('app')
    .controller('UserController', UserController);   
    
    UserController.$inject = ['UserService'];
    
    function UserController(UserService) {
        
        var vm = this;
        vm.registration = false;
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
        
    };
})();