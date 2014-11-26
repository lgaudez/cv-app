angular.module('cvApp').service('AuthService',
    ['$rootScope', '$http', '$cookies' , function($rootScope, $http, $cookies) {

        $rootScope.auth = {isLogged : false};

        $rootScope.$watch(
            function(){
                return $cookies['cv-token']
            },
            function(newValue){
                console.log("cv-token", newValue);
                if(newValue) $rootScope.auth.isLogged = true;
            },
            true
        );

//        $rootScope.isLogged = function(){
//            console.log("isLogged()", $rootScope.auth.isLogged);
//            return $rootScope.auth.isLogged;
//        };

        this.login = function(credential){
            $http.post("/rest/auth", credential).success(function(data){
                $rootScope.auth = {isLogged : true};
            });
        }

    }]);