/**
 * Created by leo on 08/11/2014.
 */
var myApp = angular.module('cvApp', ['ui.router', 'pascalprecht.translate', 'tmh.dynamicLocale', 'duScroll']);

myApp.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll minus 50 extra pixels
}]);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    var prefix = '';
    /* env:prod */
//    prefix="/dev";
    /* env:prod:end */

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('main', {
            abstract: true,
            views: {
                'header': {
                    templateUrl: prefix + "/template/header.html",
                    controller: 'HeaderController'
                },
                '':{

                }
            }
        })
        .state('main.cv', {
            abstract : true,
            views: {
                '@': {
                    templateUrl : prefix + "/template/cv.html",
                    controller : 'CvCtrl'
                }
            }

        })
        .state('main.cv.show', {
            url: "/",
             views : {
                skill : {
                    templateUrl : prefix + '/template/skills.html',
                    controller: 'SkillCtrl'
                },
                education : {
                    templateUrl : prefix + '/template/education.html',
                    controller: 'EducCtrl'
                },
                me : {
                    templateUrl : prefix +  '/template/me.html'
                },
                work : {
                    templateUrl : prefix + '/template/work.html',
                    controller : 'WorkCtrl'
                },
                'contact': {
                    templateUrl: prefix + '/template/contact.html'
                }
            }
        })
        .state('main.cv.show.skill', {
            url: "skills"
        })
        .state('main.cv.show.education', {
            url: "education"
        })
        .state('main.cv.show.me', {
            url: "me"
        })
        .state('main.cv.show.work', {
            url: "work"
        })
        .state('main.contact', {
            url: "/contact",
            views : {
                '@' : {
                    templateUrl: prefix + '/template/contact.html'
                }
            }
        })
        .state('main.admin', {
            url: "/admin",
            views : {
                '@' : {
                    templateUrl : prefix + '/template/admin.html',
                    controller : 'AdminCtrl'
                }
            }
        })

}]);