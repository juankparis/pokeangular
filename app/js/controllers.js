(function(){
	"use strict";

	angular.module('pokeangular.controllers', [])

		.controller('pokedexController', ['$rootScope', '$scope', '$routeParams', 'pokemonService', function($rootScope, $scope, $routeParams, pokemonService){
			var type = $routeParams.type;
			var pokemons = [];
			$rootScope.title = "";
			
			if(type){
				$scope.type = type;
				
				pokemonService.byType(type).then(function(data){
					$scope.pokemons = pokemons = data;
					$rootScope.title = "type";
				});
			}else{
				pokemonService.all().then(function(data){
					$scope.pokemons = pokemons = data;
				});
			}

			$scope.search = function(){
                var result = pokemons;
                
                if ($scope.searchTerm) {
                    result = pokemons.filter(function (pokemon) {
                    var name = pokemon && pokemon.name || "";

                    return name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) !== -1;
                });
            }
            $scope.pokemons = result;
            };

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