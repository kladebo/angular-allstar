'use strict';

angular.module('core')

.filter('fsearch', function() {
	return function(items, field, value) {
		//console.log(items, field, value);
		//console.log(value, typeof value);
		var filteredItems = [], fieldvalue, testvalue;

		angular.forEach(items, function(item, index, parent){
			fieldvalue = item[field].toString();
			
			if(typeof value === 'object'){
				testvalue = ','+value.join(',')+',';
				if(testvalue.indexOf(','+fieldvalue+',') >= 0){
					filteredItems.push(item);
				}
			}else if(fieldvalue.indexOf(value) >= 0){
				filteredItems.push(item);
			}
		});
		return filteredItems;
	};
});
