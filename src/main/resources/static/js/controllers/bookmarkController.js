(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'BookmarkService', 'uibDateParser', '$scope'];
   
    function BookmarkController($filter, BookmarkService, uibDateParser, $scope) {
        
        var vm = this;
        vm.saveBookmark = saveBookmark;
        vm.bookmarkShare = bookmarkShare;        

        init();

        function init() {
            vm.error = {};
            vm.bookmark = {
                date: new Date(),
            	visibility: true
            };
            vm.closeModal = false;
        }

        function saveBookmark(bookmark){
        	bookmark.user = $scope.$parent.vm.user;
        	bookmark.tags = bookmark.tags.split(" ");
            bookmark.date = $filter('date')(bookmark.date, "yyyy-MM-dd");
            bookmark.category.id = 1;
            bookmark.category.name = "search engine";
            BookmarkService.saveBookmark(bookmark).then(function(response){
                getBookmarks();
                $('#addBookmarkModal').modal('hide');
            }, function(error){
                vm.error = error;
            })
            vm.error = {};
        }

        function bookmarkShare(state){
        	vm.bookmark.visibility = state;
        }
        
    };
})();
