const vm = new Vue({
    el: '#app',
    data: {
	currMale : -1,
	currFemale : -1,
	
	maleArray : [
	    {name : 'Johan', matchId : 10, id : 0, image: 20},
	    {name : 'Erik', matchId : 11, id : 1, image: 21},
	    {name : 'Jalmar', matchId : 12, id : 2, image: 22},
	    {name : 'Lars', matchId : 13, id : 3, image: 23},
	    {name : 'Åke', matchId : 14, id : 4, image: 24},
	    {name : 'Tor', matchId : 15, id : 5, image: 25},
	    {name : 'Valdermar', matchId : 16, id : 6, image: 26},
	    {name : 'Jan', matchId : 17, id : 7, image: 27},
	    {name : 'Olle', matchId : 18, id : 8, image: 28},
	    {name : 'Rolf', matchId : 19, id : 9, image: 29},
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

	    if (hasOpened) {
		if (this.currMale == male && repetitiveMale)
		{
		    this.closeMaleNav();
		    repetitiveMale = false;
		    
		}
		else {
		this.closeMaleNav();
		let bignav = document.getElementById("mySidenav");
		let fun = this.maleArray[male].name;
		let newText = document.createTextNode(fun);
		let nav1 = document.createElement("Div");
		button = document.getElementById(male);
		button.style.color = "green";		
		nav1.appendChild(newText);
		bignav.replaceChild(nav1, bignav.childNodes[1]);
		this.openMaleNav();
		    repetitiveMale = true;
		}
	    }
	    else {
		hasOpened = true;
		repetitiveMale = true;
		let bignav = document.getElementById("mySidenav");
		button = document.getElementById(male);
		button.style.color = "green";
		let fun = this.maleArray[male].name;
		let a = document.createElement("Div");
		let nav1 = document.createTextNode(fun);
		a.appendChild(nav1);
		bignav.appendChild(a);
		this.openMaleNav();
	    }    
	    /* check if only unselect or new */
	    /* open profile-window */
	    /* unselect prev */
	    /* highlight */
	    this.currMale = this.maleArray[male].id;
	    
	},
	femaleClick: function(female) {
	    if (hasOpenedF) {
		if (this.currFemale == female && repetitiveFemale)
		{	    
		    this.closeFemaleNav();
		    repetitiveFemale = false;
		}
		else {
		    this.closeFemaleNav();
		    let bignav = document.getElementById("mySidenavf");
		    let fun = this.femaleArray[female-10].name;
		    let newText = document.createTextNode(fun);
		    let nav1 = document.createElement("Div");
		    Fbutton = document.getElementById(female);		
		    Fbutton.style.color = "green";
		    nav1.appendChild(newText);
		    bignav.replaceChild(nav1, bignav.childNodes[1]);
		    this.openFemaleNav();
		    repetitiveFemale = true;
		}
	    }
	    else {
		hasOpenedF = true;
		repetitiveFemale = true;
		let bignav = document.getElementById("mySidenavf");
		Fbutton = document.getElementById(female);
		Fbutton.style.color = "green";
		let fun = this.femaleArray[female-10].name;
		let a = document.createElement("Div");
		let nav1 = document.createTextNode(fun);
		a.appendChild(nav1);
		bignav.appendChild(a);
		this.openFemaleNav();
	    }
	    /* check if only unselect or new */
	    /* open profile-window */
	    /* unselect prev */
	    /* highlight */
	    this.currFemale = this.femaleArray[female-10].id;
	},		
	openMaleNav: function() {
	    document.getElementById("mySidenav").style.width = "30vw";
	    
	},
	openFemaleNav: function() {
	    document.getElementById("mySidenavf").style.width = "30vw";
	},
	closeFemaleNav: function() {
	    document.getElementById("mySidenavf").style.width = "0";
	    document.body.style.backgroundColor = "white";
    	    Fbutton.style.color = "red";
   
	},
	closeMaleNav: function() {
	    document.getElementById("mySidenav").style.width = "0";
	    document.body.style.backgroundColor = "white";
	    button.style.color = "blue";
	},
	popup: function(both) {
	    this.maleClick(both);
	    this.femaleClick(both+10);
	    
	},
	unmatch: function(){
	    if (this.currMale+10 == this.currFemale) {
		document.getElementById(this.maleArray[this.currMale].image).src="../img/1876985.png";		
	    }
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

