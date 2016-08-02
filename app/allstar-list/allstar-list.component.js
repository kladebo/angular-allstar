'use strict';

angular.module('allstar.list')

.component('allstarList', {
	
	templateUrl: 'allstar-list/allstar-list.template.html',
	controller: ['Allstar', 'fsearchFilter',
	function allstarListCtrl(Allstar, fsearchFilter) {
		var self = this;
		
		self.form = {};
		self.form.a = '';
		self.form.b = '';
		self.form.team = '';
		self.form.c_active = '';
		self.form.d = '';
		self.form.lg = '';
		self.order = 'a';
		self.orderReverse = false;
		self.resultAmountArr = [5,10,25,50,100,1000];
		self.resultAmount = self.resultAmountArr[1];

		Allstar.query(function (response) {
			self.data = response;
			self.players = response.players;
			self.filtered_players = fsearchFilter(self.players, 'a', '');
			self.headers = response.headers;
			self.b_list = makeUnique(self.players, 'b');
			self.team = makeUnique(self.players, 'e');
			self.c_list = makeUnique(self.players, 'c');
			self.lg = makeUnique(self.players, 'f');
		});

		self.orderTable = function (item) {
			
			if(self.order === item){
				self.orderReverse = !self.orderReverse;
			}else{
				self.orderReverse = false;
				self.order = item;
			}
		};

		self.check = function (item, klaas) {
			//console.log(item);
			var t = [];
			for(var i in item){
				if(item.hasOwnProperty(i)){
					if(item[i] === true){
						t.push(i);
					}
				}
			}
			self.form[klaas] = t.length ? t : '';
			self.filter();
		};

		self.filter = function (){
			
			self.filtered_players = fsearchFilter(self.players, 'a', self.form.a || '');
			self.filtered_players = fsearchFilter(self.filtered_players, 'b', self.form.b || '');
			self.filtered_players = fsearchFilter(self.filtered_players, 'c', self.form.c_active || '');
			self.filtered_players = fsearchFilter(self.filtered_players, 'd', self.form.d || '');
			self.filtered_players = fsearchFilter(self.filtered_players, 'e', self.form.team || '');
			self.filtered_players = fsearchFilter(self.filtered_players, 'f', self.form.lg || '');
			

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