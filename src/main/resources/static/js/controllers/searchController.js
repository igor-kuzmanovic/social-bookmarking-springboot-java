(function(){
    angular.module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', 'BookmarkService'];

    function SearchController($scope, BookmarkService) {

        var vm = this;
        vm.importBookmark = importBookmark;
        vm.getPublicBookmarks = getPublicBookmarks;
        
        init();
        
        function init() {
            if($scope.$parent.vm.user){
                getPublicBookmarks($scope.$parent.vm.user.name);
            };
        }
        
        function getPublicBookmarks(username){
            getCategories();
            BookmarkService.getPublicBookmarks(username).then(handleSuccessBookmarks);
        }
        
        function handleSuccessBookmarks(data, status) {
            vm.bookmarks = data;
        }
        
        function getCategories() {
            CategoryService.getCategories().then(handleSuccessCategories);
        }

        function handleSuccessCategories(data, status){
            vm.categories = data;
        }
        
        function importBookmark(bookmarkId) {
        	BookmarkService.importBookmark($scope.$parent.vm.user.name, bookmarkId).then(function(response){
            }, function(error){
                vm.error = error;
            }) 
        }
      
    };
})();