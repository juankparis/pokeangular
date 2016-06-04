(function(){
	"use strict";

	angular.module('pokeangular.controllers', [])

		.controller('pokedexController', ['$scope', 'pokemonService', function($scope, pokemonService){
			pokemonService.all().then(function(data){
				$scope.pokemons = data
			});
		}])

		.controller('PokemonController', ['$scope', '$routeParams', 'pokemonService', function($scope, $routeParams, pokemonService){
			var name = $routeParams.name
			$scope.pokemon = {};

			pokemonService.byName(name)
				.then(function(data){
					$scope.pokemon = data;
				})
		}])

		.controller('TabController', function(){
			this.tab = 1;

			this.selectTab = function(tab){
				this.tab = tab;
			};

			this.isActive = function(tab){
				return tab === this.tab;
			};

		});
})();