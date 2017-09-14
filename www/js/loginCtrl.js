app.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
        // You can include any angular dependencies as parameters for this function
        // TIP: Access Route Parameters for your page via $stateParams.parameterName
        function($scope, $stateParams, $state, $ionicHistory) {

            console.log('I am from LoginController');
            $scope.userEmail;
            $scope.userPassword;
            $scope.doLogin = function() {
                console.log('from doLogin page');
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('homePage');
            }


        }
    ])
