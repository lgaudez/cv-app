angular.module('cvApp').controller('AdminCtrl',
    ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {

        $scope.authMe = function(){
            console.log($scope.credential)
            AuthService.login($scope.credential);
        };

        $scope.translations = {};

        $scope.test = function(){
            $http.get("http://localhost:3000/rest/translations?locale=fr").success(function (data){
                console.log(data);
//                callbackSuccess(data);
            });
        };

//        function retrieveTranslationsWithLocale(locale, callbackSuccess){
//            $http.get("http://localhost:3000/translations?locale=" + locale).success(function (data){
//                callbackSuccess(data);
//            });
//        }
//
//        retrieveTranslationsWithLocale("fr", function(translations){
//            $scope.translations.fr = translations;
//        });
//
//        retrieveTranslationsWithLocale("en", function(translations){
//            $scope.translations.en = translations;
//        });
//
//
//        $scope.addTranslation = function(){
//            $http.post("http://localhost:3000/translations",
//                {key : $scope.translation.key, locale : 'en', val : $scope.translation.en.val});
//            $http.post("http://localhost:3000/translations",
//                {key : $scope.translation.key, locale : 'fr', val : $scope.translation.fr.val});
//        };

    }]);