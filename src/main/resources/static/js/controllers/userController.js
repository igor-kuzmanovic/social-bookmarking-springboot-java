(function(){
    angular.module('app')
    .controller('UserController', UserController);   
    
    UserController.$inject = ['UserService'];
    
    function UserController(UserService) {
        
        var vm = this;
        vm.saveUser = saveUser; 

        function saveUser(user){
            UserService.saveUser(user);
        }
    };
})();