mainAppModule.service('passwordBoxService', [function () {
        
        var defaultPassword = [
            {
                "key":"first",
                "value":""
            }, 
            {
                "key":"second",
                "value":""
            }, 
            {
                "key":"third",
                "value":""
            },
            {
                "key":"fourth",
                "value":""
            }
        ];
        return{
            getDefaultPassword: function (){
                return defaultPassword;
            }
        };
}]);


