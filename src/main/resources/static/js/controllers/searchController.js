(function(){
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'BookmarkService', 'CategoryService'];

  function SearchController($scope, BookmarkService, CategoryService) {

    var vm = this;
    vm.importBookmark = importBookmark;
    vm.getPublicBookmarks = getPublicBookmarks;
    vm.selectBookmark = selectBookmark;
    vm.bookmarks;
    vm.selectedBookmark;

    init();

    function init() {
      if($scope.$parent.vm.user){
        getPublicBookmarks($scope.$parent.vm.user.name);
      };
    }

    function getPublicBookmarks(username){
      getCategories();
      BookmarkService.getPublicBookmarks(username).then(handleSuccessBookmarks);
    }

    function handleSuccessBookmarks(data, status) {
      vm.bookmarks = data;
    }

    function getCategories() {
      CategoryService.getCategories().then(handleSuccessCategories);
    }

    function handleSuccessCategories(data, status){
      vm.categories = data;
    }

    function importBookmark(bookmarkId) {
      BookmarkService.importBookmark($scope.$parent.vm.user.name, bookmarkId).then(function(response){
      }, function(error){
        vm.error = error;
      }) 
    }

    function selectBookmark(bookmark) {
      if(vm.selectedBookmark == bookmark) {
        vm.selectedBookmark = null;
      }
      else {
        vm.selectedBookmark = bookmark;
      }
    }

  };
})();