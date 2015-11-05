mainAppModule.service('menuDataService', [function () {
        var menuList = [];

        var settingsData = {};
        
        function setSettingsData(data){
            settingsData = data;
        }

        return{
            getMenuList: function (pageType) {
                switch (pageType) {
                    case 'settings':
                    {
                        menuList = [
                            {name: "Network & Connectivity", isSelect: true, url: 'views/networkAndConnectivity.html', type: 'networkAndConnectivity'},
                            {name: "Personalization", url: 'views/personalization.html', type: 'personalization'},
                            {name: "Privacy & Security", url: 'views/privacyAndSecurity.html', type: 'privacyAndSecurity'},
                            {name: "Storage", url: 'views/storage.html', type: 'storage'},
                            {name: "Device", url: 'views/device.html', type: 'device'}
                        ];

                        return menuList;
                    }
                }
            },
            getTabData: function (item, pageType) {
                switch (pageType) {
                    case 'settings':
                    {
                        var _args = {
                            apiName: item.type
                        }                        
                        
                        api.execute('getSettingsData', _args, function (srvData) {
                            setSettingsData(srvData); 
                        });
                    }
                }
            },
            getSettingsData: function (){
                return settingsData;
            }
            
        }
    }]);

