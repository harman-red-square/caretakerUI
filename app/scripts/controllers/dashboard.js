mainAppModule.controller('dashboardCntrl', ['$scope', 'menuDataService', 'popupService', '$timeout','dashboardDataService', function ($scope, menuDataService, popupService, $timeout, dashboardDataService) {
           
            obj1= dashboardDataService.getDashboardData();
    
}]);