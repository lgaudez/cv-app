
angular.module('cvApp')
    .service('I18nService', [ '$translate' ,'tmhDynamicLocale', function($translate, tmhDynamicLocale){
        var self = this;

        this.changeI18n = function (langKey) {
            $translate.use(langKey);
            tmhDynamicLocale.set(langKey);
        };
    }])

    .run(['tmhDynamicLocale', function(tmhDynamicLocale){
        //Set detfault locale to french
        tmhDynamicLocale.set("fr-fr");
    }])

    .config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js');
    }])

    .config(['$translateProvider' , function($translateProvider) {
        $translateProvider.useUrlLoader('rest/translations');
        $translateProvider.preferredLanguage('fr-fr');
    }]);