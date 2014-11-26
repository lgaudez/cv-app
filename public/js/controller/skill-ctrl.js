angular.module('cvApp').controller('SkillCtrl',
    ['$scope', '$filter', '$uiViewScroll', function($scope, $filter) {

        $scope.skillsBdd = [];

        var nb = 4;

        var i;
        var prefix;


        for(i = 1; i <= nb; i++){
            prefix = 'skill.bdd.skill' + i;
            $scope.skillsBdd.push({
                title: prefix + '.title',
                percent : $filter('translate')(prefix + '.percent')
            })
        }

        $scope.skillsFront = [];

        nb = 3;

        for(i = 1; i <= nb; i++){
            prefix = 'skill.frontend.skill' + i;
            $scope.skillsFront.push({
                title: prefix + '.title',
                percent : $filter('translate')(prefix + '.percent'),
                desc: prefix + '.desc'
            })
        }

        $scope.skillsBack = [];

        nb = 4;

        for(i = 1; i <= nb; i++){
            prefix = 'skill.backend.skill' + i;
            $scope.skillsBack.push({
                title: prefix + '.title',
                percent : $filter('translate')(prefix + '.percent'),
                desc: prefix + '.desc'
            })
        }

    }]);
