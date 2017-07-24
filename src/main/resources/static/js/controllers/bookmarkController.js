(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'BookmarkService', 'CategoryService', 'uibDateParser', '$scope'];
   
    function BookmarkController($filter, BookmarkService, CategoryService, uibDateParser, $scope) {
        
        var vm = this;
        vm.saveBookmark = saveBookmark;
        vm.bookmarkShare = bookmarkShare;
        vm.getCategories = getCategories;
        vm.getBookmarks = getBookmarks;
        vm.deleteBookmark = deleteBookmark;
        vm.selectBookmark = selectBookmark;
        vm.addModalOperation = addModalOperation;
        vm.editModalOperation = editModalOperation;
        vm.shareBookmark = shareBookmark;
        vm.operation = {};
        vm.selectedBookmark = {};
        vm.bookmarks = {};
        vm.categories = {};
        vm.tags = {};
        vm.model = {};
        vm.tagsToSend = [];

        init();
    
        function init() {
            vm.error = {};
            vm.bookmark = {};
            vm.closeModal = false;
            getCategories();
            getBookmarks();
        }
        
        function selectBookmark(bookmark) {
            vm.selectedBookmark = bookmark;
            console.log(vm.selectedBookmark.title);
        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }
        
        function handleSuccessBookmarks(data, status) {
            vm.bookmarks = data;
        }

        function saveBookmark(bookmark) {
            if(vm.operation.name == "Edit bookmark") {
                console.log("id taken");
                bookmark.id = vm.selectedBookmark.id;
            }
         	// bookmark.user = $scope.$parent.vm.user.username;
        	var username = {};
        	username.username = $scope.$parent.vm.user.name;
        	bookmark.user = username;

            var temp = vm.tags.split(' ');

            temp.forEach(function(t) {
                var tag = {};
                tag.name = t;
                vm.tagsToSend.push(tag);
            });

            bookmark.date = new Date();
            bookmark.date = $filter('date')(bookmark.date, "yyyy-MM-dd");

            bookmark.category = vm.categories[vm.model - 1];

            bookmark.tags = vm.tagsToSend;

            BookmarkService.saveBookmark(bookmark).then(function(response){
                $('#addBookmarkModal').modal('hide');
                getBookmarks();
            }, function(error){
                vm.error = error;
            })
            vm.error = {};
        }

        function bookmarkShare(state){
        	vm.bookmark.visibility = state;
        }

        function getCategories() {
            CategoryService.getCategories().then(handleSuccessCategories);
        }

        function handleSuccessCategories(data, status){
            vm.categories = data;
        }

        function deleteBookmark(){
            console.log("delete called.");
            BookmarkService.deleteBookmark(vm.selectedBookmark.id).then(function(response){
                getBookmarks();
            }, function(error){

            });
            vm.selectedBookmark= {};
        }
        
        function addModalOperation() {
            delete vm.bookmark;
            vm.operation.name = "Add bookmark";
            console.log(vm.operation.name);
        }
        
        function editModalOperation() {
            vm.operation.name = "Edit bookmark";
            console.log(vm.operation.name);
            vm.error = {};
            vm.bookmark = angular.copy(vm.selectedBookmark);
            vm.bookmark.date = new Date();
            vm.bookmark.date = $filter('date')(vm.bookmark.date, "yyyy-MM-dd");
        }
        
        function shareBookmark() {
            vm.bookmark = angular.copy(vm.selectedBookmark);
            vm.bookmark.id = vm.selectedBookmark.id;
            vm.bookmark.visibility = true;
            BookmarkService.saveBookmark(vm.bookmark);
            console.log("changed?");
        }
    };
})();
