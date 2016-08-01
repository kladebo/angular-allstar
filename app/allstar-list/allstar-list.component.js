'use strict';

angular.module('allstar.list')

.component('allstarList', {
	
	templateUrl: 'allstar-list/allstar-list.template.html',
	controller: ['$http',
	function allstarListCtrl($http) {
		var self = this,
			file = 'json/allstarfull.json';

		self.order = 'a';
		self.orderReverse = false;
		self.resultAmountArr = [5,10,25,50,100,1000];
		self.resultAmount = self.resultAmountArr[0];

		$http.get(file).then(function (response) {
			console.log(response.data);
			self.data = response.data;
		},function(error){
			console.log('ERROR: ', error);
		});

		self.orderTable = function (item) {
			
			if(self.order === item){
				self.orderReverse = !self.orderReverse;
			}else{
				self.orderReverse = false;
				self.order = item;
			}
		};

	}
	]
});