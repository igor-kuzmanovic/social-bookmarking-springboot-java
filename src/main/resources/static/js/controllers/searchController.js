(function(){
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'BookmarkService', 'CategoryService', '$window'];

  function SearchController($scope, BookmarkService, CategoryService, $window) {

    var vm = this;
    vm.importBookmark = importBookmark;
    vm.getPublicBookmarks = getPublicBookmarks;
    vm.selectBookmark = selectBookmark;
    vm.openBookmark = openBookmark;
    vm.publicBookmarks;
    vm.userBookmarks;
    vm.selectedBookmark;
    vm.disableImport;

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
          }
        });
      }
    }

    function openBookmark(bookmark) {
      $window.open(bookmark.url, '_blank');
      selectBookmark(bookmark);
      $window.getSelection().removeAllRanges();
    }

  };
})();