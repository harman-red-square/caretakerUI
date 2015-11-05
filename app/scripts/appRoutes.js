var appRoutes = (function () {
    var rp;

    function update()
    {
        var routes = [
            {path: '/',  route: {templateUrl: 'views/dashboard.html', title: "Mozilla", pageType: 'loginPage'}},
            {path: '/settings',
                roles: ['admin'],
                route: {
                    templateUrl: 'views/settings.html', title: 'Settings', pageType: 'darkPage'
                }
            }
            
        ];

        var otherwises = {
            'unknown': {redirectTo: '/'}
        };
        
        // cleanup
       // rp.clear();

        for (var i = 0; i < routes.length; i++) {
                rp.when(routes[i].path, routes[i].route);
        }
    }

    function init(routeProvider) {
        rp = routeProvider;
        update();
    }

    return {'init': init, 'update': update};
})();

function safeApply($scope, fn) {
    if (!$scope.$$phase) {
        $scope.$apply(fn);
    }
    else {
        if (fn && typeof (fn) == 'function') {
            fn();
        }
    }
};


