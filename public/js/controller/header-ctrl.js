angular.module('cvApp').controller('HeaderController',
    ['$translate', '$scope', 'tmhDynamicLocale', 'I18nService',
        function($translate, $scope, tmhDynamicLocale, I18nService) {

            $scope.changeLanguage = I18nService.changeI18n;

        }]);
