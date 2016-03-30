myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}])
.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}])
.controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password,$scope.registerForm.fName, $scope.registerForm.lName)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}])
.controller('homeController', 
    ['$scope', '$location', 'AuthService','userInfo','$http','$timeout','Upload',
    function($scope, $location, AuthService,userInfo,$http,$timeout,Upload){
    if(!AuthService.isLoggedIn()){
      $location.path('/login');
    }else{
      id=localStorage.getItem("username");
      userInfo.get(id).then(function(response){
        //console.log("These are the values that I ned"+JSON.parse(response.data.userInfo));
        $scope.userDetails= JSON.parse(response.data.userInfo)[0];
        $scope.listOfposts = JSON.parse(response.data.post);
        $scope.statusUpdate =true;
      });
    }
    $scope.statusUpdate =true;
    $scope.updateDetails = function(){
      $scope.statusUpdate =true;
      $http.post('/user/update',{
        username:localStorage.getItem('username'),
        userinfo:
        {
          name:
          {
            first:$scope.userDetails.userinfo.name.first,
            last:$scope.userDetails.userinfo.name.last
          },
          age:$scope.userDetails.userinfo.age,
          qualifications:
          {
            highSchool:$scope.userDetails.userinfo.qualifications.highSchool,
            intermediate:$scope.userDetails.userinfo.qualifications.intermediate,
            ug:$scope.userDetails.userinfo.qualifications.ug,
            pg:$scope.userDetails.userinfo.qualifications.pg,
            others:$scope.userDetails.userinfo.qualifications.others
          },
          status:$scope.userDetails.userinfo.status
        }
      }).success(function(response){
        $scope.message = "Profile Updated Successfully";
        $scope.showMessage = true;
        $timeout(function(){
          $scope.showMessage = false;
        }, 3000);
      });
    }
    $scope.onFileSelect = function(file) {
      Upload.upload({
            url: '/user/upload',
            data: {file:file,username: localStorage.getItem('username')}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
  };
  $scope.addPost = function(status){
    $http.post('/user/updatePost',{post:status,username: localStorage.getItem('username')}).then(function(response){
        console.log("response.data-->"+response.data);
        $scope.listOfposts = JSON.parse(response.data);
    });
  }
  $scope.$watch('userDetails.userinfo.age',function(age){
    if(age<=21){
      $scope.isLegal ="N";
    }else{
      $scope.isLegal ="Y";
    }
  });
}]);