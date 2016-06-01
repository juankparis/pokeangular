(function(){
	'use strict';

	angular.module('pokeangular.filters', [])

		.filter('imageify', function () {
	    	return function (input) {
	      	var url = "img/pokemons/" + input.toLowerCase() + ".jpg";
	      	return url;
	    	};
	  	});
})();