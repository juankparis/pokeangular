(function(){
	"use strict";

	angular.module('pokeangular.controllers', [])

		.controller('pokedexController', ['$scope', 'pokemonService', function($scope, pokemonService){
			pokemonService.all().then(function(data){
				$scope.pokemons = data
			});
		}])

		.controller('PokemonController', ['$scope', function($scope){
			$scope.pokemon = {
				id: "001",
	      		name: "Bulbasaur",
	      		species: "Seed Pokémon",
	      		type: [ "Grass", "Poison" ],
	      		height: "2′4″ (0.71m)",
	      		weight: "15.2 lbs (6.9 kg)",
	      		abilities: [ "Overgrow", "Chlorophyll"],
			    stats: {
			    	hp: 45,
			    	attack: 49,
			    	defense: 49,
			    	"sp.atk": 65,
			    	"sp.def": 65,
			    	speed: 45,
			    	total: 318
			    },
			    evolution: [ "Bulbasaur", "Ivysaur", "Venusaur" ]
			};
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