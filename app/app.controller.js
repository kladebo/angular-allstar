'use strict';

angular.module('myApp')

.controller('AppCtrl', ['$scope', function($scope) {
	$scope.app = {};
	$scope.app.title = 'Allstar';
	$scope.app.subtitle = 'angular app';
}]);