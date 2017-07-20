(function(){
    angular.module('app')
    .controller('HomeController', HomeController);

    UserController.$inject = ['BookmarkService', '$location'];

    function UserController(BookmarkService, $location) {

        var vm = this;
        vm.isActive = isActive;
        vm.bookmarks;

        init();

        function init() {
            getBookmarks();
        }
        
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
        
        function getBookmarks() {
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }
        
        function handleSuccessBookmarks(data, status) {
            vm.bookmarks = data;
        }     
        
    };
})();
