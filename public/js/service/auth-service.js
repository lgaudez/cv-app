angular.module('cvApp').service('AuthService',
    ['$rootScope', '$http', function($rootScope, $http) {

        this.login = function(credential){
            $http.post("/rest/auth", credential).success(function(data){
                $rootScope.isLogged = true;
            });
        }

    }]);