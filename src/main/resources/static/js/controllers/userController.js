(function(){
  angular.module('app')
    .controller('UserController', UserController);

  UserController.$inject = ['UserService', 'BookmarkService', '$http', '$location', '$route'];

  function UserController(UserService, BookmarkService, $http, $location, $route) {

    var vm = this;       
    vm.login = login;
    vm.logout = logout;
    vm.saveUser = saveUser;
    vm.toggleLoginPage = toggleLoginPage;
    vm.navbarControl = navbarControl;
    vm.user;
    vm.error;
    vm.success;
    vm.showLoginPage;

    var roles = [];
    var userstatus;
    var role;

    init();

    function init() {
      vm.showLoginPage = false;
      vm.displayBookmarks = false;
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
      registration.roles = roles;
      UserService.saveUser(registration).then(handleSuccessUser,
                                              function(error){
        vm.error = "Username already exists!";
      });
    }

    function handleSuccessUser() {
      vm.showLoginPage = true;
      delete vm.error;
      delete vm.registration;
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
      if(!credentials) {
        vm.error = "Please fill in all fields!";
        return;
      }
      if(credentials.username && !credentials.password){
        vm.error = "Please enter your password!";
        return;
      }
      if(!credentials.username && credentials.password){
        vm.error = "Please enter your username!";
        return;
      }
      var base64Credential = btoa(credentials.username + ':' + credentials.password);
      $http.get('users/login', {
        headers: {
          'Authorization': 'Basic ' + base64Credential
        }
      }).success(function (response) {
        delete vm.credentials;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
        navbarControl(1);
        vm.user = response;
        vm.displayBookmarks = true;
      }).error(function (error) {               
        vm.error = 'Bad credentials!';
      });
    }

    function logout() {
      $http.defaults.headers.common['Authorization'] = null;
      vm.showLoginPage = false;
      vm.displayBookmarks = false;            
      delete vm.user;
      delete vm.error;
    }

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
    function navbarControl(selectedNavItem) {
        vm.currentNavItem = selectedNavItem;
    }

  };
})();
