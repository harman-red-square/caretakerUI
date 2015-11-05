var mainAppModule = angular.module('mozillaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'mainMenu',
    'sideBar',
    'ui.bootstrap',
    'dashboardMenu',
     'moveToNext'
]).config(function ($routeProvider) {
    appRoutes.init($routeProvider);
});
