(function(){
  angular.module('app')
    .controller('BookmarkController', BookmarkController);

  BookmarkController.$inject = ['$filter', 'BookmarkService', 'CategoryService', 'uibDateParser', '$scope', '$location', '$window'];

  function BookmarkController($filter, BookmarkService, CategoryService, uibDateParser, $scope, $location, $window) {

    var vm = this;
    vm.init = init;
    vm.addModalOperation = addModalOperation;
    vm.editModalOperation = editModalOperation;
    vm.detailsModalOperation = detailsModalOperation;
    vm.getUserBookmarks = getUserBookmarks;
    vm.saveBookmark = saveBookmark;
    vm.deleteBookmark = deleteBookmark;
    vm.shareBookmark = shareBookmark;
    vm.selectBookmark = selectBookmark;
    vm.openBookmark = openBookmark;
    vm.getCategories = getCategories;

    init();

    function init(){
      if($scope.$parent.vm.user){
        getUserBookmarks();
      }
    }

    function selectBookmark(bookmark) {
      if(!vm.selectedBookmark || vm.selectedBookmark.id != bookmark.id) {
        vm.selectedBookmark = bookmark;
      }
      else {
        vm.selectedBookmark = null;
      }
    }

    function getUserBookmarks(){
      if($scope.$parent.vm.user.name) {
        BookmarkService.getUserBookmarks().then(handleSuccessBookmarks);
      }
    }

    function handleSuccessBookmarks(data, status) {
      vm.bookmarks = data;
    }

    function saveBookmark(bookmark) {
      bookmark.user = {username:$scope.$parent.vm.user.name};
      bookmark.date = $filter('date')(new Date(), "yyyy-MM-dd");
      BookmarkService.saveBookmark(bookmark).then(function(response){
        vm.editBookmarkModal.$setPristine();
        $('#addBookmarkModal').modal('hide');
        getUserBookmarks();
        vm.selectedBookmark = vm.bookmark;
        delete vm.bookmark;
      }, function(error){
        vm.error = error;
      })
    }

    function getCategories() {
      if($scope.$parent.vm.user.name) {
        CategoryService.getCategories().then(handleSuccessCategories);
      }
    }

    function handleSuccessCategories(data, status){
      vm.categories = data;
    }

    function deleteBookmark(){
      BookmarkService.deleteBookmark(vm.selectedBookmark.id).then(function(response){
        $('#deleteBookmarkModal').modal('hide');
        getUserBookmarks();
        delete vm.selectedBookmark;
      }, function(error){
        vm.error = error;
      });
    }

    function addModalOperation() {
      getCategories();
      delete vm.error;
      delete vm.bookmark;
      vm.operation = "add";
    }

    function editModalOperation() {
      getUserBookmarks();
      getCategories();
      delete vm.error;
      vm.operation = "edit";
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.bookmark.date = new Date(vm.bookmark.date);
      vm.bookmark.date = vm.bookmark.date.toDateString();
      
    }

    function detailsModalOperation() {
      getUserBookmarks();
      getCategories();
      delete vm.error;
      vm.operation = "details";
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.bookmark.date = new Date(vm.bookmark.date);
      vm.bookmark.date = vm.bookmark.date.toDateString();
    }

    function shareBookmark() {
      vm.selectedBookmark.public = !vm.selectedBookmark.public;
      BookmarkService.saveBookmark(vm.selectedBookmark).then(function(response){
        $('#shareBookmarkModal').modal('hide');
        getUserBookmarks();
      }, function(error){
        vm.error = error;
      })
    }

    function openBookmark(bookmark) {
      $window.open(bookmark.url, '_blank');
      selectBookmark(bookmark);
      $window.getSelection().removeAllRanges();
    }

  };
})();
