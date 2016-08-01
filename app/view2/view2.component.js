
'use strict';

angular.module('view2')

.component('view2', {
	templateUrl: 'view2/view2.template.html',
	controller: [
	function View2Ctrl() {
		// 'this' refers to '$ctrl' within the template;
		// standard Angular isolated-scope 'component' behaviour
		var self = this;
		self.title = 'View2 Module';
	}
	]
});
