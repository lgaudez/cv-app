angular.module('cvApp').controller('WorkCtrl',
    ['$scope', function($scope) {

        $scope.works = [];

        var nb = 4;

        for(var i = 1; i <= nb; i++){
            var prefix = 'work.work' + i;
            $scope.works.push({
                start: prefix + '.start',
                end : prefix + '.end',
                company : prefix + '.company',
                desc : prefix + '.desc',
                title : prefix + '.title'
            })
        }

    }]);
