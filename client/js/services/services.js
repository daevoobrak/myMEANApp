myApp.factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;
    function isLoggedIn() {
      //console.log('user', localStorage.getItem('username'));
      userStatus = localStorage.getItem('user');
      if(userStatus == "true") {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          //console.log("data"+username);
          if(status === 200 && data.status){
            localStorage.setItem("user", true);
            localStorage.setItem("username", username);
            user = true;
            deferred.resolve();
          } else {
            localStorage.setItem("user", false);
            localStorage.removeItem("username");
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          localStorage.setItem("user", false);
          localStorage.removeItem("username");
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          localStorage.setItem("user", false);
          localStorage.removeItem("username");
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password,fName,lName) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {
          username: username,
          password: password,
          userinfo:
          {
            name:
            {
              first:fName,
              last:lName
            }
          }
        })
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

}]);