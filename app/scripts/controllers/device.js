mainAppModule.controller('DeviceCtrl', ['$scope', 'menuDataService', 'popupService', '$timeout', function ($scope, menuDataService, popupService, $timeout) {


        getData();
        $timeout(function () {
            $scope.items = angular.copy(menuDataService.getSettingsData().accessibility);
        });


        $scope.$on('saveCalled', function (event, args) {
            var obj1 = $scope.items;
            var obj2 = menuDataService.getSettingsData().device;

            var result = test(obj1, obj2);

            console.log(result);



        });

        function test(obj1, obj2) {
            var result = {};
            for (var key in obj1) {
                if (obj2[key] != obj1[key])
                    result[key] = obj2[key];
                if (typeof obj2[key] == 'array' && typeof obj1[key] == 'array')
                    result[key] = arguments.callee(obj1[key], obj2[key]);
                if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object')
                    result[key] = arguments.callee(obj1[key], obj2[key]);
            }

            return result;
        }




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
            if ($scope.dataRoaming) {
                var popupData = {
                    "headerText": "Turn On Data Roaming?",
                    "bodyText": "Depending on your service agreement, extra charges may apply for data when you are in a roaming area.",
                    "warningText": "Would you like to turn on data roaming?",
                    "template": "",
                    "cb": true
                };

                var buttons = [
                    {
                        "title": "Turn On",
                        action: function () {
                            $timeout(function () {
                                //if (popupService.getCB())
                                //successPopup();
                            });
                        }
                    }
                ]

                popupService.open(popupData, buttons);
            }
        }

        function getData() {
            var pageType = {name: "Device", url: 'views/device.html', isSelect: true, type: 'device'}
            menuDataService.getTabData(pageType, 'settings');
        }
    }]);



