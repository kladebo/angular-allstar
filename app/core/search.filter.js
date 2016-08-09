'use strict';

angular.module('core')

.filter('fsearch', function() {
	return function(items, field, value) {
		// console.log(items, field, value);
		var filteredItems = [],
			fieldvalue,
			testvalue;

		if(value === null){
			value = '';
		}

		if(angular.isObject(value)){
			testvalue = '';
			for(var i in value){
				if(value[i] === true){
					testvalue += i+',';
				}
			}
			if(testvalue !== ''){
				testvalue = ','+testvalue;
			}
			//console.log(testvalue);
		}


		angular.forEach(items, function(item){

			fieldvalue = angular.isUndefined(item[field]) ? 'blank' : item[field].toString();
			
			if(angular.isObject(value)){
				if(testvalue === '' || testvalue.indexOf(','+fieldvalue+',') >= 0){
					filteredItems.push(item);
				}
			}else if(fieldvalue.indexOf(value) >= 0){
				filteredItems.push(item);
			}
		});
		return filteredItems;
	};
});
