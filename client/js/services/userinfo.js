myApp.factory('userInfo', ['$http', function($http){
  return {
    get : function(id){
      return $http.get('/user/details/'+id);
    },
    cancel : function(id) {
      return $http.delete('/user/delete/'+id);
    }
  };
}])