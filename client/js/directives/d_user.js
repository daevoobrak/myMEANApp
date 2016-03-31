myApp.directive('userInfo', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
      scope: true, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
      templateUrl: '/partials/user_info.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    controller : function($scope,$http){
        //Get data in here and send to link function
    },
    link: function($scope, iElm, iAttrs, controller) {
      $scope.$watch('userDetails.userinfo.age',function(age){
        if(age <= 21){
          $scope.isLegal ="N";
        }else{
          $scope.isLegal ="Y";
        }
      });
    }
  };
}).directive('userPost', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller: function($scope, $element, $attrs, $transclude,$http) {
      $scope.deletePost = function(id){
        console.log('username '+id);
        $http.delete('/user/delPost',{id:id}).then(function(response){

        });
      }
    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
     templateUrl: '/partials/user_post.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      
    }
  };
});