angular.module('cvApp').controller('EducCtrl',
    ['$scope', function($scope) {

        $scope.educations = [];

        var nb = 4;

        for(var i = 1; i <= nb; i++){
            var prefix = 'education.education' + i;
            $scope.educations.push({
                start: prefix + '.start',
                end : prefix + '.end',
                institute : prefix + '.institute',
                desc : prefix + '.desc',
                title : prefix + '.title'
            })
        }

}]);
