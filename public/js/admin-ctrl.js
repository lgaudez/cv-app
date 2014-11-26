angular.module('cvApp').controller('AdminCtrl',
    ['$scope', '$http', function($scope, $http) {

        $scope.authMe = function(){
            $http.post("/rest/auth", {login : 'leo', password : 'leo'}).success(function(data){
              console.log(data);
            })
        };

        $scope.translations = {};

        function retrieveTranslationsWithLocale(locale, callbackSuccess){
            $http.get("http://localhost:3000/translations?locale=" + locale).success(function (data){
                callbackSuccess(data);
            });
        }

        retrieveTranslationsWithLocale("fr", function(translations){
            $scope.translations.fr = translations;
        });

        retrieveTranslationsWithLocale("en", function(translations){
            $scope.translations.en = translations;
        });


        $scope.addTranslation = function(){
            $http.post("http://localhost:3000/translations",
                {key : $scope.translation.key, locale : 'en', val : $scope.translation.en.val});
            $http.post("http://localhost:3000/translations",
                {key : $scope.translation.key, locale : 'fr', val : $scope.translation.fr.val});
        };

        $scope.test = function(){

//            var req = {
//                method: 'POST',
//                url: "http://localhost:3000/auth",
//                headers: {
//                    'Content-Type': undefined
//                },
//                data: { test: 'test' },
//            }

            $http.post("http://localhost:3000/auth", {withCredentials: true , login : 'leo', password: 'leo'}).success(function(data){
                console.log(data);
            })
        }

    }]);