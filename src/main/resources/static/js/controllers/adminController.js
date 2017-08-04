(function(){
  angular.module('app')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['UserService', 'BookmarkService', 'CommentService', 'CategoryService', '$scope', '$filter'];

  function AdminController(UserService, BookmarkService, CommentService, CategoryService, $scope, $filter) {

    var vm = this;
    vm.changePanel = changePanel;
    vm.selectBookmark = selectBookmark;
    vm.getBookmarks = getBookmarks;
    vm.bookmarkEditModal = bookmarkEditModal;
    vm.bookmarkDetailsModal = bookmarkDetailsModal;
    vm.editBookmark = editBookmark;
    vm.deleteBookmark = deleteBookmark;
    vm.deleteComment = deleteComment;
    vm.getBookmarkComments = getBookmarkComments;
    vm.selectCategory = selectCategory;
    vm.getCategories = getCategories;
    vm.categoryAddModal = categoryAddModal;
    vm.addCategory = addCategory;
    vm.categoryEditModal = categoryEditModal;
    vm.editCategory = editCategory;
    vm.deleteCategory = deleteCategory;
    vm.selectUser = selectUser;
    vm.getUsers = getUsers;
    vm.blockUnblockUser = blockUnblockUser;
    vm.deleteUser = deleteUser;

    function changePanel(panelId) {
      vm.panel = panelId;

      if(vm.panel === 1){
        getBookmarks();
      }
      else if(vm.panel === 2){
        getUsers();
      }
      else if(vm.panel === 3){
        getCategories();
      }

      if($scope.$parent.vm.user) {
        vm.currentUser = $scope.$parent.vm.user;
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

    function getBookmarks() {
      if($scope.$parent.vm.user.name) {
        BookmarkService.getBookmarks().then(handleSuccessBookmarks);
      }
    }

    function bookmarkEditModal() {
      vm.editBookmarkModal.$setPristine();
      getBookmarks();
      getCategories();
      delete vm.error;
      vm.operation = "edit";
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.bookmark.date = new Date(vm.bookmark.date);
      vm.bookmark.date = vm.bookmark.date.toDateString();      
    }

    function bookmarkDetailsModal() {
      vm.editBookmarkModal.$setPristine();
      getBookmarks();
      getCategories();
      delete vm.error;
      vm.operation = "details";
      vm.bookmark = angular.copy(vm.selectedBookmark);
      vm.bookmark.date = new Date(vm.bookmark.date);
      vm.bookmark.date = vm.bookmark.date.toDateString();
    }

    function handleSuccessBookmarks(data, status){
      vm.bookmarks = data;
    }

    function editBookmark(bookmark){
      bookmark.date = $filter('date')(new Date(), "yyyy-MM-dd");
      BookmarkService.saveBookmark(bookmark).then(function(response) {
        vm.editBookmarkModal.$setPristine();
        $('#detailsBookmarkModal').modal('hide');
        getBookmarks();
        vm.selectedBookmark = vm.bookmark;
        delete vm.bookmark;
      }, function(error){
        vm.error = error;
      })
    }

    function deleteBookmark(){
      BookmarkService.deleteBookmark(vm.selectedBookmark.id).then(function(response){
        $('#deleteBookmarkModal').modal('hide');
        getBookmarks();
        delete vm.selectedBookmark;
      }, function(error){
        vm.error = error;
      });
    }

    function deleteComment(commentId){
      CommentService.deleteComment(commentId).then(function(response){
        vm.getBookmarkComments();
      }, function(error){
        vm.error = error;
      })
    }

    function getBookmarkComments() {
      BookmarkService.getBookmarkComments(vm.selectedBookmark).then(handleSuccessBookmarkComments);
    }

    function handleSuccessBookmarkComments(data, status) {
      vm.comments = data;
    }

    function selectCategory(category) {
      if(!vm.selectedCategory || vm.selectedCategory.id != category.id) {
        vm.selectedCategory = category;
      }
      else {
        vm.selectedCategory = null;
      }
    }

    function getCategories() {
      if($scope.$parent.vm.user.name) {
        CategoryService.getCategories().then(handleSuccessCategories);
      }
    }

    function handleSuccessCategories(data, status){
      vm.categories = data;
    }

    function addCategory(category) {
      CategoryService.saveCategory(category).then(function(response) {
        vm.addCategoryModal.$setPristine();
        $('#addCategoryModal').modal('hide');
        getCategories();
        delete vm.category;
      }, function(error){
        vm.error = error;
      })
    }
    
    function categoryAddModal() {
      vm.addCategoryModal.$setPristine();
      delete vm.category;
      delete vm.error;
    }

    function categoryEditModal() {
      vm.editCategoryModal.$setPristine();
      delete vm.error;
      vm.editedCategory = angular.copy(vm.selectedCategory);      
    }

    function editCategory(editedCategory) {
      CategoryService.saveCategory(editedCategory).then(function(response) {
        vm.editCategoryModal.$setPristine();
        $('#editCategoryModal').modal('hide');
        getCategories();
        vm.selectedCategory = vm.editedCategory;
        delete vm.editedCategory;
      }, function(error){
        vm.error = error;
      })
    }

    function deleteCategory(){
      CategoryService.deleteCategory(vm.selectedCategory.id).then(function(response){
        $('#deleteCategoryModal').modal('hide');
        getCategories();
        delete vm.selectedCategory;
      }, function(error){
        vm.error = error;
      });
    }

    function selectUser(user) {
      if(!vm.selectedUser || vm.selectedUser.id != user.id) {
        vm.selectedUser = user;
      }
      else {
        vm.selectedUser = null;
      }
    }

    function getUsers() {
      if($scope.$parent.vm.user.name) {
        UserService.getUsers().then(handleSuccessUsers);
      }
    }

    function handleSuccessUsers(data, status){
      vm.users = data;
    }

    function blockUnblockUser(){
      UserService.blockUnblockUser(vm.selectedUser.id).then(function(response){
        $('#blockUnblockUserModal').modal('hide');
        getUsers();
        delete vm.selectedUser;
      }, function(error){
        vm.error = error;
      });
    }

    function deleteUser(){
      UserService.deleteUser(vm.selectedUser.id).then(function(response){
        $('#deleteUserModal').modal('hide');
        getUsers();
        delete vm.selectedUser;
      }, function(error){
        vm.error = error;
      });
    }

  };
})();
