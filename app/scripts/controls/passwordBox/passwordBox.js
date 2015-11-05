angular.module('passwordBox', []).directive('passwordBox', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/controls/passwordBox/passwordBox.html',
        scope: {
            type: '@'
        },
        controller: ["$scope", 'passwordBoxService', function ($scope, passwordBoxService) {

                switch ($scope.type) {
                    case 'create':
                        $scope.defaultPasscode = angular.copy(passwordBoxService.getDefaultPassword());
                        break;
                    case 'confirm':
                        break;
                }

                $scope.confirmPasscodeDefault = angular.copy(passwordBoxService.getDefaultPassword());
              
            }]
    };
});