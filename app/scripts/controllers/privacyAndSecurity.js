mainAppModule.controller('PrivacyandsecurityCtrl', ['$scope', 'menuDataService', 'popupService', '$timeout', 'passwordBoxService', function ($scope, menuDataService, popupService, $timeout, passwordBoxService) {

        getData();
        $timeout(function () {
            $scope.items = angular.copy(menuDataService.getSettingsData().privacyAndSecurity);
        });

        $scope.passcodeData = [
            {
                "pass": "immediately"
            },
            {
                "pass": "After 1 minute"
            },
            {
                "pass": "After 5 minutes"
            },
            {
                "pass": "After 15 minutes"
            },
            {
                "pass": "After 30 minutes"
            },
            {
                "pass": "After 1 hour"
            }
        ];
        $scope.changePasscode = function () {
            var currentPasscodeDefault = angular.copy(passwordBoxService.getDefaultPassword());
            var createNewPasscodeDefault = angular.copy(passwordBoxService.getDefaultPassword());
            var confirmNewPasscodeDefault = angular.copy(passwordBoxService.getDefaultPassword());
            var data = [];
            data.push(currentPasscodeDefault);
            data.push(createNewPasscodeDefault);
            data.push(confirmNewPasscodeDefault);
            var popupData = {
                "headerText": "",
                "bodyText": "",
                "warningText": "",
                "template": "views/changePasscode.html",
                "cb": false,
                "data": data
            };
            var buttons = [
                {
                    "title": "Ok",
                    action: function () {
                        $timeout(function () {
                            var crruntPasscode = popupData.data[0].map(function (item) {
                                return item['value'];
                            }).toString().replace(/\,/g, "");
                            var createNewPasscode = popupData.data[1].map(function (item) {
                                return item['value'];
                            }).toString().replace(/\,/g, "");
                            var confirmNewPasscode = popupData.data[2].map(function (item) {
                                return item['value'];
                            }).toString().replace(/\,/g, "");
                            if (createNewPasscode !== confirmNewPasscode) {
                                $scope.errorMsg = "Passcode doesn't match. Try again.";

                                console.log($scope.errorMsg)
                            }
                            else {


                            }
                        })
                    }
                }
            ]
            popupService.open(popupData, buttons);
        }

        $scope.openPopup = function () {
            if ($scope.items.privacy.passcodeLock.isEnabled) {
                var createPasscodeDefault = angular.copy(passwordBoxService.getDefaultPassword());
                var confirmPasscodeDefault = angular.copy(passwordBoxService.getDefaultPassword());
                var data = [];
                data.push(createPasscodeDefault);
                data.push(confirmPasscodeDefault);
                var popupData = {
                    "headerText": "",
                    "bodyText": "",
                    "warningText": "",
                    "template": "views/createPasscode.html",
                    "cb": false,
                    "data": data
                };
                var buttons = [
                    {
                        "title": "Ok",
                        action: function () {
                            $timeout(function () {
                                var crPasscode = popupData.data[0].map(function (item) {
                                    return item['value'];
                                }).toString().replace(/\,/g, "");
                                var cfPasscode = popupData.data[1].map(function (item) {
                                    return item['value'];
                                }).toString().replace(/\,/g, "");

                                if (crPasscode !== cfPasscode) {
                                    return false;
                                }
                                else {
                                    alert("password  match");
                                }
                            })
                            $scope.createPasscode = true;
                        }
                    }
                ]
                var popup = popupService.open(popupData, buttons);
            }
            else if ($scope.items.privacy.passcodeLock.isEnabled == 0)
            {
                $scope.createPasscode = false;
            }
        };

        $scope.resetAll = function () {
            $scope.items.privacy.passcodeLock.isEnabled = false;
            $scope.items.privacy.screenLock = false;
            $scope.createPasscode = false;
        }

        function getData() {
            var pageType = {name: "Privacy & Security", isSelect: true, url: 'views/privacyAndSecurity.html', type: 'privacyAndSecurity'};
            menuDataService.getTabData(pageType, 'settings');
        }
    }]);

