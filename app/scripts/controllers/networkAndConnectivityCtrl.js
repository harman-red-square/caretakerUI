mainAppModule.controller('networkAndConnectivityCtrl', ['$scope', 'menuDataService', 'popupService', '$timeout', '$rootScope', function ($scope, menuDataService, popupService, $timeout, $rootScope) {
        $scope.items = {};
        getData();
        $timeout(function () {
            $scope.items = angular.copy(menuDataService.getSettingsData().networkAndConnectivity);
        })


        $scope.$on('saveCalled', function (event, args) {
            console.log("Save Called")
        });


//        function successPopup() {
//            var popupData = {
//                "headerText": "",
//                "bodyText": "",
//                "warningText": "",
//                "template": "",
//                "cb": false
//            };    
//
//            var buttons = [
//                {
//                    "title": "",
//                    action: function () {
//                    }
//                }
//            ]
//
//            popupService.open(popupData, buttons);
//        }


        $scope.openDataRoamingPopup = function () {
            if ($scope.items.celluarAndData.dataRoaming) {
                var popupData = {
                    "headerText": "Turn On Data Roaming?",
                    "bodyText": "Depending on your service agreement, extra charges may apply for data when you are in a roaming area.",
                    "warningText": "Would you like to turn on data roaming?",
                    "template": "",
                    "errorMsg": "",
                    "cb": false // set true if want another popup to open
                };

                var buttons = [
                    {
                        "title": "Turn On",
                        action: function () {
                            $rootScope.$on('checkModalError', function (event, mass) {
                                var isError = true;
                                popupData.errorMsg = "Test Error"
                                if (isError) {
                                    popupService.setIsError(isError);
                                }
                            });
                        }
                    }
                ]

                popupService.open(popupData, buttons);
            }
        }

        function getData() {
            var pageType = {name: "Network & Connectivity", isSelect: true, url: 'views/networkAndConnectivity.html', type: 'networkAndConnectivity'};
            menuDataService.getTabData(pageType, 'settings');
        }
    }]);



