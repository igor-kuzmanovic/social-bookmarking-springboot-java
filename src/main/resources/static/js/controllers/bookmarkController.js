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
      if(vm.selectedBookmark == bookmark) {
        vm.selectedBookmark = null;
      }
      else {
        vm.selectedBookmark = bookmark;
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
        $('#addBookmarkModal').modal('hide');
        getUserBookmarks();
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
      vm.operation = "add";
    }

    function editModalOperation() {
      getCategories();
      delete vm.error;
      vm.operation = "edit";
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.bookmark.date = new Date(vm.bookmark.date);
    }

    function detailsModalOperation() {
      vm.operation = "details";
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
