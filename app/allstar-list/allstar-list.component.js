'use strict';

angular.module('allstar.list')

.component('allstarList', {
	
	templateUrl: 'allstar-list/allstar-list.template.html',
	controller: ['Allstar', 'fsearchFilter',
	function allstarListCtrl(Allstar, fsearchFilter) {
		var self = this;
		
		self.form = {};
		self.form.query = '';
		self.form.year = '';
		self.order = 'a';
		self.orderReverse = false;
		self.resultAmountArr = [5,10,25,50,100,1000];
		self.resultAmount = self.resultAmountArr[1];

		Allstar.query(function (response) {
			self.data = response;
			self.players = response.players;
			self.filtered_players = fsearchFilter(self.players, 'a', '');
			self.headers = response.headers;
			self.year = makeUnique(self.players, 'b');
		});

		self.orderTable = function (item) {
			
			if(self.order === item){
				self.orderReverse = !self.orderReverse;
			}else{
				self.orderReverse = false;
				self.order = item;
			}
		};

		self.filter = function (){
			
			self.filtered_players = fsearchFilter(self.players, 'a', self.form.query || '');
			self.filtered_players = fsearchFilter(self.filtered_players, 'b', self.form.year || '');

		};

		function makeUnique(list, field){

			//console.log(list);

			var unique = list.map(function (item) {
				return item[field];
			}).filter(function(item,i,a){
				//console.log(item,i,a);
				return i === a.indexOf(item);
			});

			//console.log(unique);
			return unique;
		}

	}
	]
});