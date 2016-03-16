myApp.factory('userInfo', ['$http', function($http){
  return {
    get : function(id){
      return $http.get('/user/details/'+id).success(function(data){
        console.log('The data is'+data.username);
      });
    },
    cancel : function(id) {
      return $http.delete('/user/delete/'+id);
    }
  };
}])