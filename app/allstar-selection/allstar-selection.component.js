'use strict';

angular.module('allstar.selection')

.component('allstarSelectionList', {
	
	templateUrl: 'allstar-selection/allstar-selection.template.html',
	require: {
		allstarListCtrl: '^allstarList'
	},
	controller: [
	function allstarSelectionListCtrl() {
		var self = this;

		self.id = 'klaas';
		self.$onInit = function() {
			self.selectedPlayers = self.allstarListCtrl.selectedPlayers;
			console.log('after',self);
		};
	}]
});