new Vue({
    el: '#app',
    data: {
	currMale : -1,
	currFemale : -1,
	
	maleArray : [
	    {name : 'Johan', matchId : 10, id : 0},
	    {name : 'Erik', matchId : 11, id : 1},
	    {name : 'Jalmar', matchId : 12, id : 2},
	    {name : 'Lars', matchId : 13, id : 3},
	    {name : 'Åke', matchId : 14, id : 4},
	    {name : 'Tor', matchId : 15, id : 5},
	    {name : 'Valdermar', matchId : 16, id : 6},
	    {name : 'Jan', matchId : 17, id : 7},
	    {name : 'Olle', matchId : 18, id : 8},
	    {name : 'Rolf', matchId : 19, id : 9},
	],


	femaleArray : [
            {name : 'Lina', matchId : 0, id : 10},
	    {name : 'Frida', matchId : 1, id : 11},
	    {name : 'Mona Lisa', matchId : 2, id : 12},
	    {name : 'Erika', matchId : 3, id : 13},
	    {name : 'Linn', matchId : 4, id : 14},
	    {name : 'Simone', matchId : 5, id : 15},
	    {name : 'Julia', matchId : 6, id : 16},
	    {name : 'Bennilina', matchId : 7, id : 17},
	    {name : 'Johanna', matchId : 8, id : 18},
	    {name : 'Stina', matchId : 9, id : 19},
	],
    },
    methods: {
	maleClick: function(male) {
	    /* check if only unselect or new */
	    /* open profile-window */
	    /* unselect prev */
	    /* highlight */
	    this.currMale = male.id;
	},

	femaleClick: function(female) {
	    /* check if only unselect or new */
	    /* open profile-window */
	    /* unselect prev */
	    /* highlight */
	    this.currFemale = female.id;
	},

	rematch: function() {
	    if(this.currMale >= 0 && this.currFemale >= 0){
		for(var i = 0; i < this.femaleArray.length; i++) {
		    if(this.currFemale == this.femaleArray[i].id) {
			break;
		    }
		}
		for(var ii = 0; ii < this.maleArray.length; ii++) {
		    if(this.currMale == this.maleArray[ii].id) {
			break;
		    }
		}

		var oldFemaleIndex = this.maleArray[ii].matchId - 10;
		var oldMaleIndex = this.femaleArray[i].matchId;

		this.femaleArray[i].matchId = ii;
		this.maleArray[ii].matchId = i+10;
		
		this.femaleArray[oldFemaleIndex].matchId = oldMaleIndex;
		this.maleArray[oldMaleIndex].matchId = oldFemaleIndex;

		var tmp = this.femaleArray[oldFemaleIndex];
		this.femaleArray.splice(oldFemaleIndex, 1, this.femaleArray[i]);
		this.femaleArray.splice(i, 1, tmp);
	    }
	},
    },
})

