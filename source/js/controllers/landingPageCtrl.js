
app.controller('landingPageCtrl', ['$scope', 'authFactory', '$location', '$localStorage', function($scope, authFactory, $location, $localStorage){
	$scope.createUser = function(){
		authFactory.addUser($scope.fName, $scope.lName, $scope.userEmail, $scope.userPassword).then(function(data){
			if(data!="response coming from server"){
				console.log("data failed");
			}
			else{
				console.log("data is: ",data);
				$localStorage.successMsg = true;
				$location.path('/login');
			}
		});
	};
}]);
