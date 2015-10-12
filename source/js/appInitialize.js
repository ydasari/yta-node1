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