
'use strict';

angular.module('view1')

.component('view1', {
	templateUrl: 'view1/view1.template.html',
	controller: [
	function View1Ctrl() {
		// 'this' refers to '$ctrl' within the template;
		// standard Angular isolated-scope 'component' behaviour
		var self = this;
		self.title = 'View1 Module';
	}
	]
});
