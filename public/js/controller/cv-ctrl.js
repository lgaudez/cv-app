angular.module('cvApp').controller('CvCtrl',
    ['$scope' , '$rootScope', '$document', '$timeout', '$state', function($scope, $rootScope, $document, $timeout, $state) {

        //Scroll to right view
        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
                if(toState.name.indexOf("main.cv.show.") > -1){
                    var tmp = toState.name.split(".");
                    var id  = "#" + (tmp[tmp.length - 1]);
                    $timeout(function(){
                        scrollTo(id)
                    }, 0);
                }
            }
        );

        // whn scrolling over an subview is detected, update $state
        $scope.$on('duScrollspy:becameActive', function($event, $element){
                var state = "main.cv.show." + $element.data('du-scrollspy') ;
                $state.go(state,function(){},{notify : false})
            }
        );

        function scrollTo(id){
            var elem = angular.element( document.querySelector(id) );
            $document.scrollToElement(elem, 50, 1000);
        }

    }]);


