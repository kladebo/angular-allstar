'use strict';

angular.module('core')

.filter('fsearch', function() {
	return function(items, field, value) {
		//console.log(items, field, value);
		//console.log(value, typeof value);
		var filteredItems = [], fieldvalue, testvalue;

		if(value === null){
			value = '';
		}


		angular.forEach(items, function(item, index, parent){

			fieldvalue = angular.isUndefined(item[field]) ? 'blank' : item[field].toString();
			
			if(angular.isObject(value)){
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
