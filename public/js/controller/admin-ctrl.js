angular.module('cvApp').controller('AdminCtrl',
    ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {

        $scope.authMe = function(){
            console.log($scope.credential)
            AuthService.login($scope.credential);
        };

        $scope.translations = {};

        function retrieveTranslationsWithLocale(locale, callbackSuccess){
            $http.get("http://localhost:3000/rest/translations?lang=" + locale).success(function (data){
                callbackSuccess(data);
            });
        }

        $scope.translations= [];

        function _indexOf(list, key){
            for (var i = 0; i < list.length; i++){
                if(list[i].key == key) return i;
            }
            return -1;
        }

        retrieveTranslationsWithLocale("fr-fr", function(translations){

            //first locale translation
            // add key
            for (var key in translations) {
                if (translations.hasOwnProperty(key)) {
                    var i18n = {key: key, translations:[]};
                   i18n.translations.push({locale : 'fr-fr', value:  translations[key]});
                   $scope.translations.push(i18n);
                }
            }

            // second locale
            retrieveTranslationsWithLocale("en-gb", function(translations){
                for (var key in translations) {
                    if (translations.hasOwnProperty(key)) {
                        var iKey = _indexOf($scope.translations, key);
                        // key does not exist
                        if(iKey <= -1) {
                            var i18n = {key: key, translations:[{locale : 'fr-fr', value:  translations[key]}]};
                            i18n.translations.push(i18n);
                        }
                        else{
                            //Key exist
                            console.log("key exist", $scope.translations[iKey]);
                            $scope.translations[iKey].translations.push({locale : 'fr-fr', value:  translations[key]});
                        }
                    }
                }
            });
        });

        $scope.updateTranslation = function(translation){
            $http.post("http://localhost:3000/translations",translation);
        };

//        $scope.addTranslation = function(){
//            $http.post("http://localhost:3000/translations",
//                {key : $scope.translation.key, locale : 'en-en', val : $scope.translation.en.val});
//            $http.post("http://localhost:3000/translations",
//                {key : $scope.translation.key, locale : 'fr-fr', val : $scope.translation.fr.val});
//        };

    }]);