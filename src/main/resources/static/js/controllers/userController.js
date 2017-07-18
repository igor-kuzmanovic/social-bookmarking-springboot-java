(function(){
    angular.module('app')
    .controller('UserController', UserController);   
    
    UserController.$inject = ['UserService'];
    
    function UserController(UserService) {
        
        var vm = this;
        vm.saveUser = saveUser;
        vm.userStatus = {};
        vm.userStatus.id = 1;
        vm.userStatus.type = "STATUS_ACTIVE";
        vm.role = {};
        vm.role.id = 2;
        vm.role.type = "ROLE_USER";
        vm.roles = [vm.role];
        
        function saveUser(user){
        	user.userStatus = vm.userStatus;
        	user.roles = vm.roles;
            UserService.saveUser(user);
        }
    };
})();