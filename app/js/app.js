(function(){
	"use strict";
	
	var app = angular.module('pokeangular', [
		'ngRoute',
		'pokeangular.controllers',
		'pokeangular.directives',
		'pokeangular.filters'
	]);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl: '/views/pokedex.html'
			})
			.when('/pokemon/:name', {
				templateUrl: '/views/pokemon.html',
				controller: 'PokemonController',
				controllerAs: 'pkmCtrl'
			})
			.otherwise({ 
				redirectTo: '/' 
			});
	}]);

})();