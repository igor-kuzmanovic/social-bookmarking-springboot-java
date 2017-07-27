(function(){
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['BookmarkService'];

  function HomeController(BookmarkService, $location) {

    var vm = this;
    vm.isActive = isActive;
    vm.bookmarks;

    init();

    function init() {
      getUserBookmarks($scope.$parent.vm.user.name);
    }

    function getUserBookmarks(username) {
      BookmarkService.getUserBookmarks(username).then(handleSuccessBookmarks);
    }

    function handleSuccessBookmarks(data, status) {
      vm.bookmarks = data;
    }     

  };
})();
