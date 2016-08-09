'use strict';

angular.module('allstar.selection')

.component('allstarSelectionList', {
	
	templateUrl: 'allstar-selection/allstar-selection.template.html',

	bindings: {
		selection: '<',
		onUpdate: '&'
	},
	controller: [
	function allstarSelectionListCtrl() {
		var self = this;

		self.id = 'klaas';

		console.log('a',self.selection);

		self.$onInit = function() {
			console.info('$init');
			console.log('b',self.selection);
		};

		self.$onChanges = function (changes) {
			console.info('$onChanges', changes);
			if(changes.selection){
				console.log('binnen...',self);
			}
		};

		self.$postLink = function () {
			console.info('$postLink');
		};

		self.$onDestroy = function (){
			console.info('$onDestroy');
		};

	}]
});