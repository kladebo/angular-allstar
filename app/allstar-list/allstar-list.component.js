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



		/*
		 *	Checkboxes are multi-valued so use a array for the values
		 *	filterarray: the array to hold the values
		 *	filterfield: the field to be used for the filter 
		 */

		self.checkboxFilter = function (filterarray, filterfield) {
			//console.log(item, filterfield);
			var t = [];
			for(var i in filterarray){
				if(filterarray.hasOwnProperty(i)){
					if(filterarray[i] === true){
						t.push(i);
					}
				}
			}
			self.form[filterfield] = t.length ? t : '';
			self.filter();
		};


		/*
		 *	Filters the dataset with the input from the form
		 */

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

		/*
		 *	resets the form completely
		 *	whichform: the name of the form to reset
		 */

		self.resetFilters = function(whichform){
			console.log('clearing:',whichform);
			self.form = angular.copy(self.initform);
			//self.filtered_players = angular.copy(self.players);

			// special angular resetters for form elements
			whichform.$setUntouched();
			whichform.$setPristine();
			self.filter();
		};



		/*
		 *	toggle players on a selected list
		 */

		self.selectedPlayers = [];
		self.selectPlayer = function(arg){
			var playerindex = false;

			for(var i=0, j=self.selectedPlayers.length; i<j; i+=1){
				if(self.selectedPlayers[i].id === arg.id){
					playerindex = i;
					break;
				}
			}

			if(playerindex === false){
				arg.selected = true;
				self.selectedPlayers.push(arg);

			}else{
				arg.selected = false;
				self.selectedPlayers.splice(playerindex,1);
			}
			console.log('selectedPlayers: ',self.selectedPlayers);
		};


		self.clearSelectedPlayers = function (event) {
			console.log('event:',event);
			//self.selectedPlayers = [];
			var players = event.selection;
			//for(var i=0, j=players.length; i<j; i+=1){
				var i = 0;
			while(players.length > 0){
				console.log('player: ',players[i]);
				self.selectPlayer(players[i]);
			}
		};



		/*
		 *	makes a unique array from a multivalue list
		 *	list: the list to use
		 *	field: the field to filter the list with
		 */

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