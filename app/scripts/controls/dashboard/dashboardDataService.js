mainAppModule.service('dashboardDataService', [function () {
        var iconsList = [];

        var dashboardData = {};
        
        function setdashboardData(data){
            dashboardData = data;
        }

        return{
            getIconsList: function () {
                        iconsList = {"generalIcon":[
                            {name: "Call Logs", url: 'views/callLogs.html', type: 'callLogs'},
                            {name: "Messages", url: 'views/messages.html', type: 'messages'},
                            {name: "Contacts", url: 'views/contacts.html', type: 'contacts'},
                            {name: "Alarm", url: 'views/alarm.html', type: 'alarm'},
                            {name: "Settings", url: 'views/settings.html', type: 'settings'},
                            {name: "Photos", url: 'views/photos.html', type: 'photos'},
                            {name: "Videos", url: 'views/videos.html', type: 'videos'}
                        ],
                        "customIcons":[
                            {name: "Push Address", url: 'views/pushService.html', type: 'pushService'},
                            {name: "Find My Device", url: 'views/findMyDevice.html', type: 'findMyDevice'},  
                       ]
                    };

                        return iconsList;
            },
            getIconData: function (item, pageType) {
                        var _args = {
                            apiName: item.type
                        }
                        api.execute('getIconData', _args, function (srvData) {
                            setdashboardData(srvData);
                        });
            },
            getDashboardData: function (){
                return dashboardData;
            }
        }
    }]);

