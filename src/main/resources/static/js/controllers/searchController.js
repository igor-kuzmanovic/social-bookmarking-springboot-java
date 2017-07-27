(function(){
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'BookmarkService', 'CategoryService'];

  function SearchController($scope, BookmarkService, CategoryService) {

    var vm = this;
    vm.importBookmark = importBookmark;
    vm.getPublicBookmarks = getPublicBookmarks;
    vm.selectBookmark = selectBookmark;
    vm.publicBookmarks;
    vm.userBookmarks;
    vm.selectedBookmark;
    vm.disableImport;
    vm.importErrorMessage;

    init();

    function init() {
      if($scope.$parent.vm.user){
        getUserBookmarks($scope.$parent.vm.user.name)
        getPublicBookmarks($scope.$parent.vm.user.name);
      };
    }

    function getPublicBookmarks(username){
      getCategories();
      BookmarkService.getPublicBookmarks(username).then(handleSuccessPublicBookmarks);
    }
    
    function getUserBookmarks(username){
      BookmarkService.getUserBookmarks(username).then(handleSuccessUserBookmarks);
    }

    function handleSuccessPublicBookmarks(data, status) {
      vm.publicBookmarks = data;
    }
    
    function handleSuccessUserBookmarks(data, status) {
      vm.userBookmarks = data;
    }

    function getCategories() {
      CategoryService.getCategories().then(handleSuccessCategories);
    }

    function handleSuccessCategories(data, status){
      vm.categories = data;
    }

    function importBookmark(bookmarkId) {
      BookmarkService.importBookmark($scope.$parent.vm.user.name, bookmarkId).then(function(response){
        $('#importBookmarkModal').modal('hide');
        getPublicBookmarks($scope.$parent.vm.user.name);
        getUserBookmarks($scope.$parent.vm.user.name);
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
        vm.disableImport = false;
        vm.userBookmarks.forEach(function(bookmark) {
          if(vm.selectedBookmark.url === bookmark.url) {
            vm.disableImport = true;
            vm.inputErrorMessage = "You cannot import this bookmark!";
//            if(bookmark.imported) {
//              vm.importErrorMessage = "You have already imported this bookmark!";
//            }
//            else {
//              vm.importErrorMessage = "You cannot import your own bookmarks!";
//            }
          }
        });
      }
    }

  };
})();