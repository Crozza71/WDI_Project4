angular
.module('runners')
.controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService', 'CurrentUser', '$state', '$location'];
function UsersController(User, TokenService, CurrentUser, $state, $location){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  
  self.selectedUser  = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.showUser      = showUser;
  self.deleteUser    = deleteUser;


  function getUsers() {
    User.query(function(data){
      self.all = data;
    });
  }

  function handleLogin(res) {
   var token = res.token ? res.token : null;
   if (token) {
     self.getUsers();
     $state.go('run');
   }
   self.currentUser = CurrentUser.getUser();
 }
 function handleError(e) {
  self.error = "Something went wrong.";
}

function register() {
  User.register(self.user, handleLogin, handleError);
}

function login() {
  User.login(self.user, handleLogin, handleError);
}

function logout() {
  self.all         = [];
  self.currentUser = null;
  CurrentUser.clearUser();
}

function checkLoggedIn() {
 self.currentUser = CurrentUser.getUser();
 return !!self.currentUser;
}

function showUser(user) {
  self.selectedUser = user;
  console.log(self.selectedUser);
  $state.go('user');
}

function deleteUser(user){
  self.delete({id: user}, function(data){
    console.log(data);
  });

}

this.displayUser = function() {
  console.log(self.selectedUser)
}




if (checkLoggedIn()) {
  self.getUsers();
}

return self;
}
