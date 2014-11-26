angular.module('cvApp').controller('HeaderController',
    ['$translate', '$scope', 'tmhDynamicLocale', '$uiViewScroll','$anchorScroll', '$document',
        function($translate, $scope, tmhDynamicLocale, $uiViewScroll, $anchorScroll, $document) {

        //Set detfault locale to french
        tmhDynamicLocale.set("fr");

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        tmhDynamicLocale.set(langKey);
    };
}])
    .config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
    }]);