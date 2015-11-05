angular.module('mainMenu', []).directive('mainMenu', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/controls/mainmenu/mainMenu.html',
        scope: false,
        controller: ["$scope", "$route", 'menuDataService', function ($scope, $route, menuDataService) {
                $scope.items = [];
                var pageType = $route.current.$$route.originalPath.split("/")[1];

                $scope.items = menuDataService.getMenuList(pageType);

                $scope.currentTab = $scope.items[0].url;
               // menuDataService.getTabData($scope.items[0], pageType);

                $scope.switchTab = function (item, index) {
                    if ($scope.activeTab !== index) {
                        for (var i = 0; i < $scope.items.length; i++) {
                            $scope.items[i].isSelect = false;
                        }
                        $scope.items[index].isSelect = true;
                        $scope.activeTab = index;
                        $scope.currentTab = item.url;
                        //menuDataService.getTabData(item, pageType);
                    }
                };

                $scope.save = function () {
                    $scope.$broadcast('saveCalled', {flag: true});
                };

            }]
    };
});