(function(){
  angular.module('app')
    .controller('AdminController', AdminController);

  UserController.$inject = ['UserService', 'BookmarkService', 'CategoryService'];

  function AdminController(UserService, BookmarkService, CategoryService) {

    var vm = this;
    vm.getBookmarks = getBookmarks;                     // done   
    vm.editBookmark = editBookmark;                     // inprogress
    vm.deleteBookmark = deleteBookmark;                 // done
    vm.getCategories = getCategories;                   // done
    vm.addCategoryModalOperation = addModalOperation;   // done
    vm.addCategory = addCategory;                       // done
    vm.editCategoryModalOperation = editModalOperation; // done
    vm.editCategory;                                    // done
    vm.deleteCategory = deleteCategory;                 // done
    vm.getUsers = getUsers;                             // done
    vm.blockUnblockUser = blockUnblockUser;             // done
    vm.deleteUser = deleteUser;                         // done

    function getBookmarks() {
      BookmarkService.getBookmarks().then(handleSuccessBookmarks);
    }
    
    function handleSuccessBookmarks(data, status){
      vm.bookmarks = data;
    }
    
    function editBookmark(){
      CategoryService.saveCategory(vm.selectedCategory).then(function(response) {
        $('#editBookmarkModal').modal('hide');
        getBookmarks();
        delete vm.selectedBookmark;
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
    
    function getCategories() {
      CategoryService.getCategories().then(handleSuccessCategories);
    }

    function handleSuccessCategories(data, status){
      vm.categories = data;
    }

    function addCategoryModalOperation() {
      vm.categoryOperation = "add";
    }

    function addCategory(category) {
      if(!category.name) {
        vm.error = "Please specify a category name!";
        return;
      }

      CategoryService.saveCategory(category).then(function(response) {
        $('#addCategoryModal').modal('hide');
        getCategories();
      }, function(error){
        vm.error = error;
      })      
    }
      
    function editCategoryModalOperation() {
      vm.categoryOpeartion = "edit";
      
      if(vm.selectedBookmark.tags){
        var tags;
        vm.selectedBookmark.tags.forEach(function(tag) {
          tags += tag.name + " ";
        })
        vm.selectedBookmark.tags = tags;
      }
    }
    
    function editCategory() {
      if(!vm.selectedCategory.name) {
        vm.error = "Please specify a category name!";
        return;
      }

      CategoryService.saveCategory(vm.selectedCategory).then(function(response) {
        $('#editCategoryModal').modal('hide');
        getCategories();
        delete vm.selectedCategory;
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
    
    function getUsers() {
      UserService.getUsers().then(handleSuccessUsers);
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

  })();
