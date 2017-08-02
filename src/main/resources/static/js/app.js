(function() {
	var app = angular
			.module('app', [ 'ngRoute', 'ngResource', 'ui.bootstrap', 'ngTagsInput']);

	app
			.config([
					'$httpProvider',
					function($httpProvider) {
						$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
					} ]);

	app.filter("tagFilter", function() {
		return function(input, searchText) {
			if (searchText) {
				var returnArray = [];
				var splitText = searchText.toLowerCase().split(/\s+/);
				for (var x = 0; x < input.length; x++) {
					var count = 0;
					for (var y = 0; y < splitText.length; y++) {
						angular.forEach(input[x].tags, function(tag) {
							if (tag.name.indexOf(splitText[y]) !== -1) {
								count++;
							}
						})
					}
					if (count == splitText.length) {
						returnArray.push(input[x]);
					}
				}
				return returnArray;
			} else {
				return input;
			}
		}
	});

	app.filter("categoryFilter", function() {
		return function(category, skippedCategory) {
			var returnArray = [];
			if (skippedCategory) {
				angular.forEach(category, function(item) {
					if (item.name != skippedCategory.name) {
						returnArray.push(item);
					}
				});
				return returnArray;
			} else {
				return category;
			}
		}
	});

	app.directive('autoFocus', [ '$timeout', '$parse',
			function($timeout, $parse) {
				return {
					link : function(scope, element, attrs) {
						var model = $parse(attrs.autoFocus);

						scope.$watch(model, function(value) {
							if (value === true) {
								$timeout(function() {
									element[0].focus();
								});
							}
						});
					}
				};
			} ]);

})();
