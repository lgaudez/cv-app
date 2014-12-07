angular.module('cvApp').controller('AdminCtrl',
    ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {

        function i18nHasTranslationFor(i18n, locale){
//            console.log(i18n)
            for(var i = 0; i < i18n.translations.length; i++){
//                console.log(i, i18n.translations[i].locale);
//                console.log("i8n.translations[i]", i18n, i18n.translations[i]);
//                console.log("test", i18n.translations[i].locale == locale, "i18n.translations[i].locale", i18n.translations[i].locale , "locale", locale)
//                console.log("test", i18n.translations[i].key ,i18n.key, i18n.translations[i].key == i18n.key )
                if(i18n.translations[i].locale == locale) {
//                    console.log("true", locale,i18n.translations[i].locale)
                    return true;
                }
            }
//            console.log("return false");
            return false;
        }

        $scope.authMe = function(){
//            console.log($scope.credential)
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

            //todo refacto les langues en constant

            // second locale
            retrieveTranslationsWithLocale("en-gb", function(translations){
                for (var key in translations) {
                    if (translations.hasOwnProperty(key)) {
                        var iKey = _indexOf($scope.translations, key);
                        // key does not exist
                        if(iKey <= -1) {
                            var i18n = {key: key, translations:[{locale : 'en-gb', value:  translations[key]}]};
                            i18n.translations.push(i18n);
                        }
                        else{
                            //Key exist
//                            console.log("key exist", $scope.translations[iKey]);
                            $scope.translations[iKey].translations.push({locale : 'en-gb', value:  translations[key]});
                        }
                    }
                }
                //set property for view
                for(var i = 0; i< $scope.translations.length; i++){
                    $scope.translations[i].isMissingImportantTranslation = !i18nHasTranslationFor($scope.translations[i], 'en-gb')
                }

            });
        });

        $scope.updateTranslation = function(i18n){
            // iterate over i18n.translations, and post key, value, locale
            for(var i = 0; i< i18n.translations.length; i++){
                var translation = i18n.translations[i];
//                console.log(translation);
                $http.post("http://localhost:3000/rest/translations/" + i18n.key, translation);
            }


        };

//        $scope.addTranslation = function(){
//            $http.post("http://localhost:3000/translations",
//                {key : $scope.translation.key, locale : 'en-en', val : $scope.translation.en.val});
//            $http.post("http://localhost:3000/translations",
//                {key : $scope.translation.key, locale : 'fr-fr', val : $scope.translation.fr.val});
//        };

    }]);