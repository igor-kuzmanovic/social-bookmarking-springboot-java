(function(){
  angular.module('app')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['UserService', 'BookmarkService', 'CategoryService', '$scope'];

  function AdminController(UserService, BookmarkService, CategoryService, $scope) {

    var vm = this;
    vm.changePanel = changePanel;
    vm.selectBookmark = selectBookmark;
    vm.getBookmarks = getBookmarks;
    vm.showBookmarkDetailsModal = showBookmarkDetailsModal;
    vm.editBookmarkModal = editBookmarkModal;
    vm.editBookmark = editBookmark;
    vm.deleteBookmark = deleteBookmark;
    vm.selectCategory = selectCategory;
    vm.getCategories = getCategories;
    vm.addCategoryModal = addCategoryModal;
    vm.addCategory = addCategory;
    vm.editCategoryModal = editCategoryModal;
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
        getCategories();
      }
      else if(vm.panel === 2){
        getUsers();
      }
      else if(vm.panel === 3){
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

    function getBookmarks() {
      if($scope.$parent.vm.user.name) {
        BookmarkService.getBookmarks().then(handleSuccessBookmarks);
      }
    }

    function showBookmarkDetailsModal() {
      delete vm.error;
    }

    function handleSuccessBookmarks(data, status){
      vm.bookmarks = data;
    }

    function editBookmarkModal() {
      delete vm.error;
      vm.editedBookmark = angular.copy(vm.selectedBookmark);
    }

    function editBookmark(editedBookmark){
      BookmarkService.saveBookmark(editedBookmark).then(function(response) {
        $('#editBookmarkModal').modal('hide');
        getBookmarks();
        delete vm.editedBookmark;
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

    function selectCategory(category) {
      if(vm.selectedCategory == category) {
        vm.selectedCategory = null;
      }
      else {
        vm.selectedCategory = category;
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
        $('#addCategoryModal').modal('hide');
        getCategories();
        delete vm.category;
      }, function(error){
        vm.error = error;
      })
    }

    function editCategoryModal() {
      delete vm.error;
      vm.editedCategory = angular.copy(vm.selectedCategory);
    }

    function editCategory(editedCategory) {
      CategoryService.saveCategory(editedCategory).then(function(response) {
        $('#editCategoryModal').modal('hide');
        getCategories();
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
      if(vm.selectedUser == user) {
        vm.selectedUser = null;
      }
      else {
        vm.selectedUser = user;
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
