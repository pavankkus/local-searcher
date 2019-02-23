angular.module('khoziApp')
.controller('settingCtrl',['$scope','$http','$state','login',function($scope,$http,$state,login) {
  console.log('profileCtrl');
  let ctrl = this
  login.getProfile().then(()=> {
    ctrl.user = login.getUserDetail()
    ctrl.editedUser = Object.assign({}, ctrl.user)
    console.log("complete userdetail");
  }, () => {
  })
  ctrl.user = login.getUserDetail()
  ctrl.editedUser = Object.assign({}, ctrl.user)
  ctrl.viewMode = true
  ctrl.editProfile = function(){
    ctrl.viewMode = false
  }
  ctrl.updateProfile = function(){
    ctrl.updateUser()

  }
  ctrl.cancelEditProfile = function(){
    ctrl.editMode = false
  }
  ctrl.updateUser = function() {
    console.log(ctrl.editedUser)
    $http({
       method : "PUT",
       url : "/updateProfile",
       headers: {
         'Content-Type': "application/json"
       },
       data : ctrl.editedUser
     }).then(function(response) {
       login.setUserDetail(response.data)
       Object.assign(ctrl.user, ctrl.editedUser)
       ctrl.viewMode = true
       alert("updated successfully")
     }, function(response) {
       alert("updated failed")
       ctrl.editMode = false
     });
    }
}])
