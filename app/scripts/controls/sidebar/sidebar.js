angular.module('sideBar', []).directive('sideBar', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/controls/sidebar/sideBar.html',
        scope: false,
        controller: ["$scope", "$element", function ($scope, $element) {
                
                $scope.userName = "John's Phone";
                $scope.status = "Connected";
            }]
    };
});