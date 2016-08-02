'use strict';

angular.module('core')

.filter('fsearch', function() {
	return function(input, field, value) {
		//console.log(input, field, value);
		var d = [], f;
		if(!value){
			value = '';
		}
		angular.forEach(input, function(item, index, parent){
			f = item[field].toString();
			
			if(f.indexOf(value) >= 0){
				d.push(item);
			}
		});
		return d;
	};
});
