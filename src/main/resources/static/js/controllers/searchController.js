(function(){
  angular.module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$scope', 'BookmarkService', 'CategoryService', 'CommentService', '$window'];

  function SearchController($scope, BookmarkService, CategoryService, CommentService, $window) {

    var vm = this;
    vm.importBookmark = importBookmark;
    vm.getPublicBookmarks = getPublicBookmarks;
    vm.selectBookmark = selectBookmark;
    vm.openBookmark = openBookmark;
    vm.getBookmarkComments = getBookmarkComments;
    vm.postComment = postComment;
    vm.deleteComment = deleteComment;
    vm.rateBookmark = rateBookmark;
    vm.showRating = showRating;

    init();

    function init() {     
      if($scope.$parent.vm.user){
        getUserBookmarks()
        getPublicBookmarks();
        vm.currentUserUsername = $scope.$parent.vm.user.name;
      };
    }

    function getPublicBookmarks(){
      getCategories();
      BookmarkService.getPublicBookmarks().then(handleSuccessPublicBookmarks);
    }

    function getUserBookmarks(){
      BookmarkService.getUserBookmarks().then(handleSuccessUserBookmarks);
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
      BookmarkService.importBookmark(bookmarkId).then(function(response){
        $('#importBookmarkModal').modal('hide');
        getPublicBookmarks();
        getUserBookmarks();
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

    function getBookmarkComments() {
      BookmarkService.getBookmarkComments(vm.selectedBookmark).then(handleSuccessBookmarkComments);
    }

    function handleSuccessBookmarkComments(data, status) {
      vm.comments = data;
    }

    function postComment(commentBody) {
      CommentService.postComment(vm.selectedBookmark, commentBody).then(function(response) {
        getBookmarkComments();
        delete vm.commentBody;
      }, function(error){
        vm.error = error;
      })
    }

    function deleteComment(commentId){
      CommentService.deleteComment(commentId).then(function(response){
        vm.getBookmarkComments();
      }, function(error){
        vm.error = error;
      })
    }

    function rateBookmark(rating) {
      if(vm.yourCurrentRating){
        var isNewRating = false;
      } else {
        var isNewRating = true;
      }
      BookmarkService.rateBookmark(vm.selectedBookmark.id, rating, isNewRating).then(function(response) {
        getPublicBookmarks();
        vm.selectedBookmark = response;
        showRating();
      }, function(error){
        vm.error = error;
      })
    }
    
    function showRating() {
      delete vm.yourCurrentRating;
      vm.selectedBookmark.ratings.forEach(function(rating) {
        if(rating.user.username === vm.currentUserUsername){
          vm.yourCurrentRating = rating.rate;
        }
      });
    }

  };
})();