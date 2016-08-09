'use strict';

angular.module('allstar.list')

.component('allstarList', {
	
	templateUrl: 'allstar-list/allstar-list.template.html',
	controller: ['Allstar', 'fsearchFilter',
	function allstarListCtrl(Allstar, fsearchFilter) {
		var self = this;
		
		self.form = {
			'a' : '',
			'b' : '',
			'c' : '',
			'd' : '',
			'e' : '',
			'f' : '',
			'g' : '',
			'h' : ''
		};
		self.initform = angular.copy(self.form);
		self.order = 'a';
		self.orderReverse = false;
		self.resultAmountArr = [5,10,25,50,100,1000];
		self.resultAmount = self.resultAmountArr[1];

		Allstar.query(function (response) {
			//self.data = response;
			self.players = response.players;
			angular.forEach(self.players, function(player, index){
				player.id = index;
			});

			self.initial_players = angular.copy(self.players);
			self.filtered_players = fsearchFilter(self.players, 'a', '');
			self.headers = response.headers;
			self.b_list = makeUnique(self.players, 'b');
			self.c_list = makeUnique(self.players, 'c');
			self.e_list = makeUnique(self.players, 'e');
			self.f_list = makeUnique(self.players, 'f');
			self.g_list = makeUnique(self.players, 'g');
			self.h_list = makeUnique(self.players, 'h');
			// console.log(self);
		});

		self.orderTable = function (item) {
			
			if(self.order === item){
				self.orderReverse = !self.orderReverse;
			}else{
				self.orderReverse = false;
				self.order = item;
			}
		};

		self.check = function (item, field) {
			//console.log(item, field);
			var t = [];
			for(var i in item){
				if(item.hasOwnProperty(i)){
					if(item[i] === true){
						t.push(i);
					}
				}
			}
			self.form[field] = t.length ? t : '';
			self.filter();
		};

		self.filter = function () {

			//self.filtered_players = angular.copy(self.players);
			self.filtered_players = self.players;
			
			//self.filtered_players = fsearchFilter(self.players, 'a', self.form.a);
			self.filtered_players = fsearchFilter(self.filtered_players, 'a', self.form.a);
			self.filtered_players = fsearchFilter(self.filtered_players, 'b', self.form.b);
			self.filtered_players = fsearchFilter(self.filtered_players, 'c', self.form.c);
			self.filtered_players = fsearchFilter(self.filtered_players, 'd', self.form.d);
			self.filtered_players = fsearchFilter(self.filtered_players, 'e', self.form.e);
			self.filtered_players = fsearchFilter(self.filtered_players, 'f', self.form.f);
			self.filtered_players = fsearchFilter(self.filtered_players, 'g', self.form.g);
			self.filtered_players = fsearchFilter(self.filtered_players, 'h', self.form.h);
			
			//console.log(self);
		};

		self.reset = function(whichform){
			self.form = self.initform;
			self.filtered_players = angular.copy(self.players);

			// special angular resetters for form elements
			whichform.$setUntouched();
			whichform.$setPristine();
		};

		self.selectedPlayers = [];
		self.rowclicked = function(arg){
			var playerindex = false;
			arg.selected = !arg.selected;


			for(var i=0, j=self.selectedPlayers.length; i<j; i+=1){
				if(self.selectedPlayers[i].id === arg.id){
					playerindex = i;
					break;
				}
			}

			if(playerindex === false){
				//console.log('notfound');
				self.selectedPlayers.push(arg);
			}else{
				//console.info('found do');
				self.selectedPlayers.splice(playerindex,1);
			}
			console.log('selectedPlayers after: ',self.selectedPlayers);
		};

		function makeUnique(list, field){

			var unique = list.map(function (item) {
				return item[field];
			}).filter(function (item, index, a) {
				//console.log(item, index , a);
				return index === a.indexOf(item);
			});


			// reset value 'undefined' to 'blank'...
			// search.filter uses this value also...
			angular.forEach(unique, function(item, index){
				if(angular.isUndefined(item)){
					unique[index] = 'blank';
				}
			});

			return unique;
		}

	}
	]
});