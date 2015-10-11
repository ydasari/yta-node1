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