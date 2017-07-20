(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'BookmarkService', 'uibDateParser'];
   
    function BookmarkController($filter, BookmarkService, uibDateParser) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.bookmarkPrivacyToggle = bookmarkPrivacyToggle;
        vm.operation;
        vm.bookmark;
        vm.closeModal;

        init();

        function init() {
            vm.error = {};
            vm.bookmark = {
                date: new Date(),
            	visibility: true
            };
            vm.closeModal = false;
        }

        function addBookmark() {
//            vm.addBookmarkForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(vm.bookmark.id).then(function(response){
                getBookmarks();
            }, function(error){

            });
            vm.bookmark= {};
        }

        function editBookmark(bookmark){
        	vm.error = {};
            vm.operation = "Edit";
            vm.bookmark = angular.copy(bookmark);
            vm.bookmark.publishDate = new Date(vm.bookmark.publishDate.split('-').join(' '));
        }

//        function getCategories(){
//            CategoryService.getCategories().then(handleSuccessCategories);
//        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }

//        //Get all category
//        function handleSuccessCategories(data, status){
//            vm.categories = data;
//        }
        
        //Get all bookmarks
        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
        }

//        function openCalendar() {
//            vm.popupCalendar.opened = true;
//        };

//        function capitalize(error){
//            return '* ' + error[0].toUpperCase() + error.slice(1); 
//        }

//        function errorHandler(error){
//            switch(error.field){
//                case 'title':
//                    vm.error.title = capitalize(error.message);
//                    break;
//                case 'isbn':
//                    vm.error.isbn = capitalize(error.message);
//                    break;
//            }
//        }

        function saveBookmark(bookmark){
        	console.log(bookmark.radio1);
        	console.log(bookmark.radio2);
        	console.log("Save");
        	bookmark.tags = [];
        	bookmark.user = {};
            bookmark.date = $filter('date')(bookmark.date, "yyyy-MM-dd");
            BookmarkService.saveBookmark(bookmark).then(function(response){
                getBookmarks();
                $('#addBookmarkModal').modal('hide');
            }, function(error){
                vm.error = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
            //remove input value after submit
//            vm.addBookmarkForm.$setPristine();
            vm.error = {};
        }
        
        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
        
        function bookmarkPrivacyToggle(){
        	vm.bookmark.visibility = !vm.bookmark.visibility;
        }
        
    };
})();
