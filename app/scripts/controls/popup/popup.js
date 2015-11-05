mainAppModule.service('popupService', ['$uibModal', function ($uibModal) {
        var animationsEnabled = true;
        var cb = false;
        var _isError = false;

        function setCB(flag) {
            cb = flag;
        }

        return{
            open: function (data, buttons) {
                var modalInstance = $uibModal.open({
                    animation: animationsEnabled,
                    templateUrl: data.template == "" ? 'scripts/controls/popup/popup.html' : data.template,
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        items: function () {
                            return {
                                items: data,
                                buttons: buttons
                            };
                        }
                    }
                });

                modalInstance.result.then(function (cb) {
                    //success action
                    if (cb) {
                        setCB(cb);
                    }
                }, function () {
                    //cancel action

                    console.info('Modal dismissed at: ' + new Date());
                });
            },
            toggleAnimation: function () {
                animationsEnabled = animationsEnabled;
            },
            getCB: function () {
                return cb;
            },
            setIsError: function (isError) {
                _isError = isError;
            },
            getIsError: function () {
                return _isError;
            }
        }
    }]);


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

mainAppModule.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'items', 'popupService', '$rootScope', function ($scope, $uibModalInstance, items, popupService, $rootScope) {
        $scope.popupData = items;
        $scope.selected = {
            item: $scope.popupData[0]
        };

        $scope.ok = function () {
            if (!$scope.popupData.buttons[0].action || $scope.popupData.buttons[0].action($scope.popupData.buttons[0].data) !== false) {
                if (!$scope.popupData.items.cb) {
                    $rootScope.$broadcast('checkModalError', 'test');
                    if (!popupService.getIsError()) {
                        $uibModalInstance.close();
                    }
                }
                else{
                    $uibModalInstance.close($scope.popupData.items.cb);
                }
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);


