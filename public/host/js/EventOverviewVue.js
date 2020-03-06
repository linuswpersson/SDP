'use strict';
const socket = io();


const vm = new Vue({
    el: '#app',
    data: {
	phase: 1,
	times: ["14:35", "15:05", "15:35"],
	currMale : -1,
	currFemale : -1,
	
	maleArray : [
	    {name : 'Johan', matchId : 10, id : 0, image: 20, picpath: '../img/plus.png', rating: []},
	    {name : 'Erik', matchId : 11, id : 1, image: 21, picpath: '../img/plus.png', rating: []},
	    {name : 'Hjalmar', matchId : 12, id : 2, image: 22, picpath: '../img/plus.png', rating: []},
	    {name : 'Lars', matchId : 13, id : 3, image: 23, picpath: '../img/plus.png', rating: []},
	    {name : 'Åke', matchId : 14, id : 4, image: 24, picpath: '../img/plus.png', rating: []},
	    {name : 'Tor', matchId : 15, id : 5, image: 25, picpath: '../img/plus.png', rating: []},
	    {name : 'Valdermar', matchId : 16, id : 6, image: 26, picpath: '../img/plus.png', rating: []},
	    {name : 'Jan', matchId : 17, id : 7, image: 27, picpath: '../img/plus.png', rating: []},
	    {name : 'Olle', matchId : 18, id : 8, image: 28, picpath: '../img/plus.png', rating: []},
	    {name : 'Rolf', matchId : 19, id : 9, image: 29, picpath: '../img/plus.png', rating: []},
	],


	femaleArray : [
            {name : 'Lina', matchId : 0, id : 10, picpath: '../img/plus.png', rating: []},
	    {name : 'Frida', matchId : 1, id : 11, picpath: '../img/plus.png', rating: []},
	    {name : 'Mona Lisa', matchId : 2, id : 12, picpath: '../img/plus.png', rating: []},
	    {name : 'Erika', matchId : 3, id : 13, picpath: '../img/plus.png', rating: []},
	    {name : 'Linn', matchId : 4, id : 14, picpath: '../img/plus.png', rating: []},
	    {name : 'Simone', matchId : 5, id : 15, picpath: '../img/plus.png', rating: []},
	    {name : 'Julia', matchId : 6, id : 16, picpath: '../img/plus.png', rating: []},
	    {name : 'Bennilina', matchId : 7, id : 17, picpath: '../img/plus.png', rating: []},
	    {name : 'Johanna', matchId : 8, id : 18, picpath: '../img/plus.png', rating: []},
	    {name : 'Stina', matchId : 9, id : 19, picpath: '../img/plus.png', rating: []},
	],
    },
    created: function(){
	socket.on('hello', function(data) {
	    if (data.gender[0] == ('M')){
		this.maleArray[0].name = data.name;
		this.maleArray[0].picpath = data.picpath;
	    }
	    else {
		this.femaleArray[0].name = data.name;
		this.maleArray[0].picpath = data.picpath;
	    }
	
	}.bind(this));
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
		    let image = document.createElement('img');
		    image.src = this.maleArray[male].picpath;
		    image.width = 350;
		    image.height = 250;
		    let newText = document.createTextNode(fun);
		    let nav1 = document.createElement("Div");
		    button = document.getElementById(male);
		    button.style.color = "darkgreen";		
		    nav1.appendChild(newText);
		    bignav.replaceChild(nav1, bignav.childNodes[1]);
		    bignav.replaceChild(image, bignav.childNodes[2]);
		    this.openMaleNav(male);
		    repetitiveMale = true;
		}
	    }
	    else {
		hasOpened = true;
		repetitiveMale = true;
		let bignav = document.getElementById("mySidenav");
		button = document.getElementById(male);
		button.style.color = "darkgreen";
		let fun = this.maleArray[male].name;
		/* IMAGE */
		let image = document.createElement('img');
		image.width = 350;
		image.height = 250;
		image.src = this.maleArray[male].picpath;
		/* RATINGS */
		let date1 = document.createElement("H6")
		let date1text = document.createTextNode("DATE 1:");
		date1.appendChild(date1text);
		let date2 = document.createElement("H6")
		let date2text = document.createTextNode("DATE 2:");
		date2.appendChild(date2text);
		let date3 = document.createElement("H6")
		let date3text = document.createTextNode("DATE 3:");
		date3.appendChild(date3text);
		
		
		
		
		let a = document.createElement("Div");
		let nav1 = document.createTextNode(fun);
		a.appendChild(nav1);
		bignav.appendChild(a);
		bignav.appendChild(image);
		/* Om det finns rating, så läses den in */
		if (this.maleArray[male].rating[0] != null){
		    bignav.appendChild(date1);
		    if(this.maleArray[male].rating[1] != null){
			bignav.appendChild(date2);
			if(this.maleArray[male].rating[2] != null){
			    bignav.appendChild(date3);
			}
		    }
		}

		this.openMaleNav(male);
	    }    
	    /* check if only unselect or new */
	    /* open profile-window */
	    /* unselect prev */
	    /* highlight */
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
		    let image = document.createElement('img');
		    image.src = this.femaleArray[female-10].picpath;
		    image.width = 350;
		    image.height = 250;
		    Fbutton = document.getElementById(female);		
		    Fbutton.style.color = "darkgreen";
		    nav1.appendChild(newText);
		    bignav.replaceChild(nav1, bignav.childNodes[1]);
		    bignav.replaceChild(image, bignav.childNodes[2]);
		    this.openFemaleNav(female);
		    repetitiveFemale = true;
		}
	    }
	    else {
		hasOpenedF = true;
		repetitiveFemale = true;
		let bignav = document.getElementById("mySidenavf");
		Fbutton = document.getElementById(female);
		Fbutton.style.color = "darkgreen";
		let fun = this.femaleArray[female-10].name;
		let a = document.createElement("Div");
		let image = document.createElement('img');
		image.width = 350;
		image.height = 250;
		image.src = this.femaleArray[female-10].picpath;
		let nav1 = document.createTextNode(fun);
		a.appendChild(nav1);
		bignav.appendChild(a);
		bignav.appendChild(image);
		this.openFemaleNav(female);
	    }
	    /* check if only unselect or new */
	    /* open profile-window */
	    /* unselect prev */
	    /* highlight */
	},		
	openMaleNav: function(male) {
	    document.getElementById("mySidenav").style.width = "30vw";
	    this.currMale = male;
	    
	},
	openFemaleNav: function(female) {
	    document.getElementById("mySidenavf").style.width = "30vw";
	    this.currFemale = female;
	},
	closeFemaleNav: function() {
	    document.getElementById("mySidenavf").style.width = "0";
    	    Fbutton.style.color = "darkred";
	    this.currFemale = -1;
   
	},
	closeMaleNav: function() {
	    document.getElementById("mySidenav").style.width = "0";
	    button.style.color = "darkblue";
	    this.currMale = -1;
	},
	startEvent: function() {
	    
	    let p = document.getElementById("phase");
	    let oldtimes = document.getElementById("times");
	    if (this.phase < 3){
	    this.phase += 1;
	    let newphase = document.createElement("Div");
	    let updatephase = document.createTextNode("Date " + this.phase);
	    newphase.appendChild(updatephase);
		p.replaceChild(newphase, p.childNodes[0]);
		let times = document.createElement("P");
		let newTimes = document.createTextNode(this.times[this.phase-1]);
		times.appendChild(newTimes);
		oldtimes.replaceChild(times, oldtimes.childNodes[0]);
		
	    }
	    else {
		let newphase = document.createElement("Div");
		let updatephase = document.createTextNode("Event Completed");
		newphase.appendChild(updatephase);
		p.replaceChild(newphase, p.childNodes[0]);
		let times = document.createElement("P");
		let newTimes = document.createTextNode("Event completed");
		times.appendChild(newTimes);
		oldtimes.replaceChild(times, oldtimes.childNodes[0]);

		
		
	    }
	       
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
		
		var from = i;
		var to = this.currMale;
		var tmp = this.femaleArray[to]; // save tmp copy
		this.femaleArray.splice(to, 1, this.femaleArray[from]); // splice the highligted female into the new match array-index.
		this.femaleArray.splice(from, 1, tmp);  // splice the non-highligted female into the highlighted ones old array-Index.
		document.getElementById(this.maleArray[this.currMale].image).src="../img/redheart.png";

		this.femaleArray[from].matchId = from;
		this.maleArray[from].matchId = from + 10;
		
		this.femaleArray[to].matchId = to;
		this.maleArray[to].matchId = to + 10;

		this.closeFemaleNav();
		repetitiveFemale = false;
		this.closeMaleNav();
		repetitiveMale = false;
		this.currFemale = -1;
		this.currMale = -1;
	    }
	},
    },
})

