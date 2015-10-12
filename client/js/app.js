var app = angular.module('YTA', ['ui.router', 'authFactoryModule', 'ngStorage']);


app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('landingPage',{
			url:'/',
			templateUrl:'landingPage.html',
			controller:'landingPageCtrl'
		})
		.state('login',{
			url:'/login',
			templateUrl:'loginPage.html',
			controller:'loginPageCtrl'
		})
		.state('userHomePage',{
			url:'/userHomePage',
			templateUrl:'userHomePage.html'
		});
		$urlRouterProvider.otherwise('/');
});

app.controller('landingPageCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
	$scope.createUser = function(){
		authFactory.addUser($scope.fName, $scope.lName, $scope.userEmail, $scope.userPassword).then(function(data){
			if(data!="response coming from server"){
				console.log("data failed");
			}
			else{
				console.log("data is: ",data);
				$location.path('/login');
			}
		});
	};
}]);

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
var authFactoryModule = angular.module('authFactoryModule',[])
	.factory('authFactory', function($http, $q, $location, $localStorage){
		var mainFactoryMethod={};

		//function for adding new user returning the promise to the authCtrl===========================================================================
		mainFactoryMethod.addUser = function(fname, lname, email, password){
			var deferred = $q.defer();
			$http.post('/signup',{
			email: email,
			password: password,
			fName: fname,
			lName: lname
			}).success(function(response){
				console.log("the response is: ",response);
				deferred.resolve(response);					
			}).error(function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		};

		//function for checking if user exists in the application and returning promise to authCtrl====================================================================
		mainFactoryMethod.checkUser = function(email, password){
			
			var deferred = $q.defer();
			$http.post('/login',{
				email: email,
				password: password
			}).success(function(response){
				deferred.resolve(response);
			}).error(function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		};

		return mainFactoryMethod;
	});