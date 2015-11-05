angular.module('mozillaApp').controller('PersonalizationCtrl', ['$scope', 'menuDataService', '$timeout', function ($scope, menuDataService, $timeout) {
        $scope.personalize = {};
        getData();
        $timeout(function () {
            $scope.personalize = angular.copy(menuDataService.getSettingsData().personalization);
        });


        $scope.initialDateTime = '0';
        $scope.vibrate = [
            {"lable": "On", "value": "1"},
            {"lable": "Off", "value": "2"}
        ];

        $scope.toneData = [
            {
                "tone": "Ringingtone"
            },
            {
                "tone": "Ringtone1"
            },
            {
                "tone": "Ringtone2"
            },
            {
                "tone": "Ringtone3"
            }

        ];
        $scope.alertData = [
            {
                "tone": "clockSound"
            },
            {
                "tone": "Ringtone1"
            },
            {
                "tone": "Ringtone2"
            },
            {
                "tone": "Ringtone3"
            }

        ];
        $scope.timeFormat = [
            {
                "time": "12-hours"
            },
            {
                "time": "24-hours"
            }
        ];
        $scope.regionList = [
            {
                "name": "Ringingtone"
            },
            {
                "name": "Ringtone1"
            },
            {
                "name": "Ringtone2"
            },
            {
                "name": "Ringtone3"
            }

        ];
        $scope.langData = [
            {
                "language": "Arabic"
            },
            {
                "language": "englishUS"
            },
            {
                "language": "Français"
            },
            {
                "language": "Chinese"
            }

        ];
        $scope.city = [
            {
                "cityName": "newYork"
            },
            {
                "cityName": "english US"
            },
            {
                "cityName": "Français"
            },
            {
                "cityName": "Chinese"
            }

        ];
        $scope.region = [
            {
                "country": "America"
            },
            {
                "country": "english US"
            },
            {
                "country": "Français"
            },
            {
                "country": "Chinese"
            }

        ];
        $scope.searchList = [
            {
                "searchEngine": "Yahoo"
            },
            {
                "searchEngine": "google"
            },
            {
                "searchEngine": "Bing"
            },
            {
                "searchEngine": "DuckDuckGo"
            }

        ];

        function getData() {
            var pageType = {name: "Personalization", isSelect: true, url: 'views/personalization.html', type: 'personalization'};
            menuDataService.getTabData(pageType, 'settings');
        }
//------------------------------API Data--------------------------------------------------

//        function settings() {
//            api.execute("settings", {}, function (srvData) {
//                $scope.ringtone = srvData.personalization.SoundSettings.Tones.ringtone;
//                $scope.alertTone = srvData.personalization.SoundSettings.Tones.alert;
//                $scope.time = srvData.personalization.dateTime.timeFormat;
//                $scope.lang = srvData.personalization.language;
//                $scope.searchName = srvData.personalization.search.searchEngine;
//                $scope.volData = srvData.personalization.SoundSettings.volume;
//                $scope.set = srvData.personalization.dateTime.setAutomatically;
//                console.log($scope.set);
//                if ($scope.set == 1) {
//                    $scope.setAutomatically = true; // fill by API
//                }
//                else {
//                    $scope.setAutomatically = false;
//                }
//                $scope.$apply();
//                
//
//            })
//        }
//        ;
//        settings();

//------------------------------API Data ends---------------------------------------------
//------------------------------------Date Picker------------------------------------------

        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
//        $scope.disabled = function (date, mode) {
//            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
//        };

        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();
//        $scope.maxDate = new Date(2020, 5, 22);

        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
                [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];

        $scope.getDayClass = function (date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        };

//-------------------------------------Date Picker Ends---------------------------------------------------
//-------------------------------------Time Picker--------------------------------------------------------
        $scope.mytime = new Date();
        $scope.hstep = 1;
        $scope.mstep = 1;
        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };
//-------------------------------------------Time Picker Ends----------------------------------------       
    }]);
