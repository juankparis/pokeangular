(function(){
	"use strict";
	
	var app = angular.module('pokeangular', [
		'ngRoute',
		'pokeangular.controllers',
		'pokeangular.directives',
		'pokeangular.filters',
		'pokeangular.services'
	]);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl: '/views/pokedex.html',
				controller: 'pokedexController'
			})
			.when('/type/:type', {
				templateUrl: '/views/pokedex.html',
				controller: 'pokedexController'
			})
			.when('/pokemon/:name', {
				templateUrl: '/views/pokemon.html',
				controller: 'PokemonController'
			})
			.otherwise({ 
				redirectTo: '/' 
			});
	}]);

})();