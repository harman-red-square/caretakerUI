angular.module('dashboardMenu', []).directive('dashboardMenu',['$location' ,function ($location) {
    return {
        restrict: 'E',
        templateUrl: 'scripts/controls/dashboard/dashboardMenu.html',
        scope: false,
        controller: ["$scope", "$route", 'dashboardDataService', function ($scope, $route, dashboardDataService) {
                $scope.icons = [];
              var pageType = $route.current.$$route.originalPath.split("/")[1];
                
                $scope.icons = dashboardDataService.getIconsList();
                
                //$scope.currentTab = $scope.items[0].url;
              //  dashboardDataService.get($scope.icons[0], pageType);
                
                $scope.goToPage = function (item, index) {                   
                            $location.path("/"+item.type);
//                        for (var i = 0; i < $scope.icons.length; i++) {
//                            $scope.icons[i].isSelect = false;
//                        }
//                        $scope.icons[index].isSelect = true;
//                        $scope.activeTab = index;
//                        $scope.currentTab = item.url;
                        //dashboardDataService.getTabData(item, pageType);
                };
            }]
    };
}]);