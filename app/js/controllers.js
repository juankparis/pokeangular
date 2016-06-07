(function(){
	"use strict";

	angular.module('pokeangular.controllers', [])

		.controller('pokedexController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function($rootScope, $scope, $routeParams, pokemonService){
			var type = $routeParams.type;
			$rootScope.title = "";
			
			if(type){
				$scope.type = type;
				
				pokemonService.byType(type).then(function(data){
					$scope.pokemons = data;
					$rootScope.title = "type";
				});
			}else{
				pokemonService.all().then(function(data){
					$scope.pokemons = data;
				});
			}

		}])

		.controller('PokemonController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function($rootScope, $scope, $routeParams, pokemonService){
			var name = $routeParams.name

			pokemonService.byName(name)
				.then(function(data){
					$rootScope.title = data.name;
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