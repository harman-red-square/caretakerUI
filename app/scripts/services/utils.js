function safeApply($scope, fn) {
    if (!$scope.$$phase) {
        $scope.$apply(fn);
    }
    else {
        if (fn && typeof (fn) == 'function') {
            fn();
        }
    }
}