app.controller('loginPageCtrl', ['$scope', 'authFactory', '$location', '$localStorage', function($scope, authFactory, $location, $localStorage){
	
	if($localStorage.successMsg==true){
		$scope.successMsg = true;
	}

	$scope.checkLoginDetails = function(){
		delete $localStorage.successMsg;
		$scope.successMsg ="";
		console.log("the user details are:", $scope.userEmail+ " "+$scope.userPassword);
		authFactory.checkUser($scope.userEmail, $scope.userPassword).then(function(data){
			if(data=="right credentials"){
				$location.path('/userHomePage');
			}
			else{
				$scope.loginFailure = true; 
				console.log("Email or password! incorrect! Please enter user@gmail.com as username and password as password");
			}
		});
	};
}]);