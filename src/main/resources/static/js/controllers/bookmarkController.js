(function(){
  angular.module('app')
    .controller('BookmarkController', BookmarkController);

  BookmarkController.$inject = ['$filter', 'BookmarkService', 'CategoryService', 'uibDateParser', '$scope', '$location', '$window'];

  function BookmarkController($filter, BookmarkService, CategoryService, uibDateParser, $scope, $location, $window) {

    var vm = this;
    vm.init = init;
    vm.saveBookmark = saveBookmark;
    vm.shareBookmark = shareBookmark;
    vm.getCategories = getCategories;
    vm.getUserBookmarks = getUserBookmarks;
    vm.deleteBookmark = deleteBookmark;
    vm.selectBookmark = selectBookmark;
    vm.addModalOperation = addModalOperation;
    vm.editModalOperation = editModalOperation;
    vm.setBookmarkPrivacy = setBookmarkPrivacy;
    vm.openBookmark = openBookmark;
    vm.getBookmarkComments = getBookmarkComments;
    // vm.operation = {};
    // vm.bookmarks = {};
    // vm.bookmark = {};
    // vm.categories = {};
    // vm.tags = {};
    // vm.isSearch = false;

    init();

    function init(){
      delete vm.tags;
      delete vm.error;
      delete vm.category;
      vm.bookmark = {};
      if($scope.$parent.vm.user){
        getUserBookmarks($scope.$parent.vm.user.name);
        getCategories();
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

    function getUserBookmarks(username){
      BookmarkService.getUserBookmarks(username).then(handleSuccessBookmarks);
    }

    function handleSuccessBookmarks(data, status) {
      vm.bookmarks = data;
    }

    function saveBookmark(bookmark) {
      if(vm.operation.name == "edit") {
        bookmark.id = vm.selectedBookmark.id;

        if(!vm.category) {
          vm.category = vm.selectedBookmark.category.id;
        }
      }

      if((!bookmark || !vm.category)
         || (!bookmark.title && !bookmark.url && !vm.category)
         || (!bookmark.title && !bookmark.url && vm.category)
         || (!bookmark.title && bookmark.url && !vm.category)
         || (bookmark.title && !bookmark.url && !vm.category)) {
        vm.error = "Please fill in all fields!";
        return;
      }

      if(bookmark.title && bookmark.url && !vm.category) {
        vm.error = "Please choose a category!";
        return;
      }

      if(bookmark.title && !bookmark.url && vm.category) {
        vm.error = "Please specify a URL!";
        return;
      }

      if(!bookmark.title && bookmark.url && vm.category) {
        vm.error = "Please specify a title!";
        return;
      }

      if(!bookmark.url.startsWith("www.") && !bookmark.url.startsWith("http://") && !bookmark.url.startsWith("https://")) {
        bookmark.url = "www." + bookmark.url;
      }

      if(!bookmark.url.startsWith("http://") && !bookmark.url.startsWith("https://")) {
        bookmark.url = "https://" + bookmark.url;
      }

      var username = {};
      username.username = $scope.$parent.vm.user.name;
      bookmark.user = username;
      bookmark.date = new Date();
      bookmark.date = $filter('date')(bookmark.date, "yyyy-MM-dd");
      bookmark.category = vm.categories[vm.category - 1];

      if(vm.tags){
        var tagsToSend = [];
        var temp = vm.tags.split(' ');

        temp.forEach(function(t) {
          var tag = {};
          tag.name = t;
          tagsToSend.push(tag);
        });

        bookmark.tags = tagsToSend;
      }
      else{
        bookmark.tags = [];
      }

      BookmarkService.saveBookmark(bookmark).then(function(response){
        $('#addBookmarkModal').modal('hide');
        vm.selectedBookmark = null;
        init();
      }, function(error){
        vm.error = error;
      })
    }

    function setBookmarkPrivacy(state){
      vm.bookmark.public = state;
    }

    function getCategories() {
      CategoryService.getCategories().then(handleSuccessCategories);
    }

    function handleSuccessCategories(data, status){
      vm.categories = data;
    }

    function deleteBookmark(){
      BookmarkService.deleteBookmark(vm.selectedBookmark.id).then(function(response){
        $('#deleteBookmarkModal').modal('hide');
        init();
      }, function(error){
        vm.error = error;
      });

      delete vm.selectedBookmark;
    }

    function addModalOperation() {
      init();
      vm.operation.name = "add";
      vm.selectedBookmark = null;
    }

    function editModalOperation() {
      init();
      vm.operation.name = "edit";
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.tags = "";
      if(vm.bookmark.tags){
        vm.bookmark.tags.forEach(function(t) {
          vm.tags += t.name + " ";
        })
      }
    }

    function shareBookmark() {
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.bookmark.public = !vm.bookmark.public;
      BookmarkService.saveBookmark(vm.bookmark).then(function(response){
        $('#shareBookmarkModal').modal('hide');
        vm.selectedBookmark = null;
        init();
      }, function(error){
        vm.error = error;
      })
    }

    function openBookmark(bookmark) {
      $window.open(bookmark.url, '_blank');
      selectBookmark(bookmark);
      $window.getSelection().removeAllRanges();
    }

    function getBookmarkComments() {
      BookmarkService.getBookmarkComments(vm.selectedBookmark).then(handleSuccessBookmarkComments);
    }

    function handleSuccessBookmarkComments(data, status) {
      vm.comments = data;
    }

  };
})();
