angular.module('app.controllers', [])
  
.controller('loginCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
		console.log('Hello I am from login controller');
		$scope.userEmail = '';
		$scope.userPassword = '';
		$scope.doLogin = function(){
			console.log($scope.userPassword);
			$state.go('homePage');
		}
}]);


