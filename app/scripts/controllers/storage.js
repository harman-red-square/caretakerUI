mainAppModule.controller('StorageCtrl', ['$scope', 'menuDataService', 'popupService', '$timeout', function ($scope, menuDataService, popupService, $timeout) {

        getData();
        $timeout(function () {
            $scope.items = angular.copy(menuDataService.getSettingsData().storage);
        });

        $scope.openPopup = function () {
            var popupData = {
                "headerText": "Format SD Card",
                "bodyText": "This will erase all data stored on your SD card, such as music and photos.",
                "warningText": "Would you like to format SD card?",
                "template": "",
                "cb": true
            };
            var buttons = [
                {
                    "title": "Format",
                    action: function () {
                        $timeout(function () {
                            if (popupService.getCB())
                                successPopup();
                        })
                    }
                }
            ]
            popupService.open(popupData, buttons);
        };
        function successPopup() {
            var popupData = {
                "headerText": "Format SD Card",
                "bodyText": "SD Card has been successfully formatted.",
                "warningText": "",
                "template": "",
                "cb": false
            };
            var buttons = [
                {
                    "title": "Ok",
                    action: function () {
                    }
                }
            ]
            popupService.open(popupData, buttons);
        }

        function getData() {
            var pageType = {name: "Storage", url: 'views/storage.html', isSelect: true, type: 'storage'};
            menuDataService.getTabData(pageType, 'settings');
        }
    }]);



