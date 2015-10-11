app.controller('loginPageCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
	$scope.checkLoginDetails = function(){
		console.log("the user details are:", $scope.userEmail+ " "+$scope.userPassword);
		authFactory.checkUser($scope.userEmail, $scope.userPassword).then(function(data){
			if(data=="right credentials"){
				$location.path('/userHomePage');
			}
			else{
				console.log("invalid credentials! Please enter user@gmail.com as username and password as password");
			}
		});
	};
}]);