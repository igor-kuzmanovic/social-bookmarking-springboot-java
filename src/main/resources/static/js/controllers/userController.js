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
      refresh();
    }

    function refresh() {
      if(vm.signupForm)
      vm.signupForm.$setPristine();
      if(vm.loginForm)
      vm.loginForm.$setPristine();
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
      refresh();
      vm.showLoginPage = true;
      vm.success = "User created!";
    }

    function toggleLoginPage() {
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
        refresh();
        navbarControl(1);    
        vm.displayBookmarks = true;
      }).error(function (error) {   
        vm.error = 'Bad credentials!';
      });
    }

    function logout() {
      $http.defaults.headers.common['Authorization'] = null;
      vm.showLoginPage = false;
      vm.displayBookmarks = false; 
      refresh();
    }

    function navbarControl(selectedNavItem) {
      vm.currentNavItem = selectedNavItem;
    }

  };
})();
