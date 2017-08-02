(function(){
  angular.module('app')
    .controller('UserController', UserController);

  UserController.$inject = ['UserService', 'BookmarkService', '$http'];

  function UserController(UserService, BookmarkService, $http) {

    var vm = this;       
    vm.login = login;
    vm.logout = logout;
    vm.saveUser = saveUser;
    vm.toggleLoginPage = toggleLoginPage;
    vm.navbarControl = navbarControl;

    init();

    function init() {
      vm.showLoginPage = false;
      vm.displayBookmarks = false;
    }

    function saveUser(registration) {
      registration.userStatus = {id: 1, type:"STATUS_ACTIVE"};
      registration.roles = [{id: 2, type:"ROLE_USER"}];
      UserService.saveUser(registration).then(handleSuccessUser,
                                              function(error){
        vm.error = "Username already exists!";
      });
    }

    function handleSuccessUser() {
      vm.signupForm.$setPristine();
      delete vm.registration;
      vm.showLoginPage = true;
      vm.success = "User created!";
    }

    function toggleLoginPage() {
      vm.signupForm.$setPristine();
      vm.loginForm.$setPristine();
      delete vm.registration;
      delete vm.credentials;
      delete vm.error;
      delete vm.success;
      vm.showLoginPage = !vm.showLoginPage;       	
    }

    function login(credentials) {
      var base64Credential = btoa(credentials.username + ':' + credentials.password);
      $http.get('users/login', {
        headers: {
          'Authorization': 'Basic ' + base64Credential
        }
      }).success(function (response) {       
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
        vm.user = response;
        vm.signupForm.$setPristine();
        vm.loginForm.$setPristine();
        delete vm.credentials;
        delete vm.error;
        delete vm.sucess;
        navbarControl(1);    
        vm.displayBookmarks = true;
      }).error(function (error) {   
        vm.error = 'Bad credentials!';
      });
    }

    function logout() {
      $http.defaults.headers.common['Authorization'] = null;
      vm.signupForm.$setPristine();
      vm.loginForm.$setPristine();
      vm.showLoginPage = false;
      vm.displayBookmarks = false;           
      delete vm.user;
    }

    function navbarControl(selectedNavItem) {
      vm.currentNavItem = selectedNavItem;
    }

  };
})();
