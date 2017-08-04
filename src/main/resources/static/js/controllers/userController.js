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
    vm.refresh = refresh;

    init();

    function init() {
      vm.showLoginPage = false;
      vm.displayBookmarks = false;
    }
    
    function refresh() {
      delete vm.registration;
      delete vm.credentials;
      delete vm.error;
      delete vm.success;
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
      refresh();
      vm.showLoginPage = true;
      vm.success = "User created!";
    }

    function toggleLoginPage() {
      vm.signupForm.$setPristine();
      vm.loginForm.$setPristine();
      refresh();
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
        refresh();
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
      refresh();
    }

    function navbarControl(selectedNavItem) {
      vm.currentNavItem = selectedNavItem;
    }

  };
})();
