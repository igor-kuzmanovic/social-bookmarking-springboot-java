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
//        	bookmark.user = $scope.$parent.vm.user.username;
        	var username = {};
        	username.username = $scope.$parent.vm.user.name;
        	bookmark.user = username;
        	var tag = {};
        	tag.name = "Fastesttt";
        	var tags = [tag];
        	bookmark.tags = tags;
            bookmark.date = $filter('date')(bookmark.date, "yyyy-MM-dd");
            bookmark.category = {};
            bookmark.category.id = 1;
            bookmark.category.name = "search engine";
            BookmarkService.saveBookmark(bookmark).then(function(response){
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
