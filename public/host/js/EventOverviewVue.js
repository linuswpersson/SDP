'use strict';
const socket = io();


const vm = new Vue({
    el: '#app',
    data: {
	eventName: '',
	eventTimeTo: '',
	eventTimeFrom: '',
	eventMessage: '',
	eventDate: '',
	eventEmail: '',
	eventLocation: '',
	phase: 1,
	maleNodes: 0, /* For keeping track of whether to replace or append objects into the html object */
	femaleNode: 0,
	times: [],
	dateSpan: [],
	currMale : -1,
	currFemale : -1,
	
	maleArray : [
	    {name : 'Johan', matchId : 10, id : 0, image: 20, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Erik', matchId : 11, id : 1, image: 21, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Hjalmar', matchId : 12, id : 2, image: 22, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Lars', matchId : 13, id : 3, image: 23, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Åke', matchId : 14, id : 4, image: 24, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Tor', matchId : 15, id : 5, image: 25, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Valdermar', matchId : 16, id : 6, image: 26, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Jan', matchId : 17, id : 7, image: 27, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Olle', matchId : 18, id : 8, image: 28, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Rolf', matchId : 19, id : 9, image: 29, picpath: '../img/plus.png', rating: [null, null, null]},
	],


	femaleArray : [
            {name : 'Lina', matchId : 0, id : 10, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Frida', matchId : 1, id : 11, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Mona Lisa', matchId : 2, id : 12, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Erika', matchId : 3, id : 13, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Linn', matchId : 4, id : 14, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Simone', matchId : 5, id : 15, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Julia', matchId : 6, id : 16, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Bennilina', matchId : 7, id : 17, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Johanna', matchId : 8, id : 18, picpath: '../img/plus.png', rating: [null, null, null]},
	    {name : 'Stina', matchId : 9, id : 19, picpath: '../img/plus.png', rating: [null, null, null]},
	],
	
	matches : Array(10),
    },
    created: function(){
	socket.on('hello', function(data) {
	    if (data.name != ''){
		if (data.gender[0] == ('M')){
		    
		    this.maleArray[0].name = data.name;
		    this.maleArray[0].picpath = data.picpath;
		    
		}
		else {
		    this.femaleArray[0].name = data.name;
		    this.femaleArray[0].picpath = data.picpath;
		}
	    }
	    this.eventName = data.eventName;
	    this.eventTimeFrom = data.eventTimeFrom;
	    this.eventTimeTo = data.eventTimeTo;
	    this.eventMessage = data.eventMessage;
	    this.eventDate = data.eventDate;
	    this.eventEmail = data.eventEmail;
	    this.eventLocation = data.eventLocation;
	    this.calculateDateTimes();
	    
	}.bind(this));
    },
    methods: {
	calculateDateTimes: function(){
	    /* i here stands for the number of dates */
	    /* Default is 3 dates */
	    let date1 = this.eventTimeFrom;
	    let newTime;
	    let i = 0;
	    for(i; i<3; i++){
		newTime = addTimes(date1, '00:30');
		this.times[i] = newTime;
		this.dateSpan[i] = addTimes(this.times[i], '00:20');
		date1 = newTime;
	    }


	
	    
	},
	
	maleClick: function(male) {
	    if (hasOpened) {
		if (this.currMale == male && repetitiveMale)
		{
		    this.closeMaleNav(male);
		    repetitiveMale = false;	    
		}
		else {
		    this.closeMaleNav(male);
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
		    /* RATINGS */
		    /* This is kinda scuffed */
		    if (this.maleArray[male].rating[0] != null){
						    
			let date1 = document.createElement("H6")
			let date1text = document.createTextNode("DATE 1:");
			date1.appendChild(date1text);
			let rating1 = document.createElement("P");
			let fetchedrating1 = document.createTextNode("rating : "+this.maleArray[male].rating[0]);
			rating1.appendChild(fetchedrating1);
			if (this.maleNodes != 2) {
			    
			    bignav.replaceChild(date1, bignav.childNodes[3]);
			    bignav.replaceChild(rating1, bignav.childNodes[4]);
			    
			}
			else {

			    bignav.appendChild(date1);
			    bignav.appendChild(rating1);
			    this.maleNodes += 2;
			    
			}
			if(this.maleArray[male].rating[1] != null){
			    
			    let date2 = document.createElement("H6")
			    let date2text = document.createTextNode("DATE 2:");
			    date2.appendChild(date2text);			
			    let rating2 = document.createElement("P");
			    let fetchedrating2 = document.createTextNode("rating : "+this.maleArray[male].rating[1]);
			    rating2.appendChild(fetchedrating2);
			    console.log(this.maleNodes);
			    let a = this.maleNodes;
			    if (a != 4) {
				
				bignav.replaceChild(date2, bignav.childNodes[5]);
				bignav.replaceChild(rating2, bignav.childNodes[6]);
							    }
			    else {
				
				bignav.appendChild(date2);
				bignav.appendChild(rating2);
				this.maleNodes += 2;

			    }
			    
			    if(this.maleArray[male].rating[2] != null){
	
				let date3 = document.createElement("H6")
				let date3text = document.createTextNode("DATE 3:");
				date3.appendChild(date3text);
				let rating3 = document.createElement("P");
				let fetchedrating3 = document.createTextNode("rating : "+this.maleArray[male].rating[2]);
				rating3.appendChild(fetchedrating3);
								
				if (this.maleNodes != 6) {
				    bignav.replaceChild(date3, bignav.childNodes[7]);
				    bignav.replaceChild(rating3, bignav.childNodes[8]);
				}
				else {
				    bignav.appendChild(date3);
				    bignav.appendChild(rating3);
				    this.maleNodes += 2;
				}
				
				
			    }
			}
		    }
		    
		    
		    this.openMaleNav(male);
		    repetitiveMale = true;
		}
	    }
	    else {
		hasOpened = true;
		repetitiveMale = true;
		let bignav = document.getElementById("mySidenav");
		let fun = this.maleArray[male].name;
		button = document.getElementById(male);
		button.style.color = "darkgreen";
		/* IMAGE */
		let image = document.createElement('img');
		image.width = 350;
		image.height = 250;
		image.src = this.maleArray[male].picpath;						
		let a = document.createElement("Div");
		let nav1 = document.createTextNode(fun);
		a.appendChild(nav1);
		bignav.appendChild(a);
		bignav.appendChild(image);
		this.maleNodes += 2;
		/* RATING */
		/* Om det finns rating, så läses den in */
		if (this.maleArray[male].rating[0] != null){
		    let date1 = document.createElement("H6")
		    let date1text = document.createTextNode("DATE 1:");
		    date1.appendChild(date1text);
		    let rating1 = document.createElement("P");
		    let fetchedrating1 = document.createTextNode("rating : " +this.maleArray[male].rating[0]);
		    rating1.appendChild(fetchedrating1);
		    bignav.appendChild(date1);
		    bignav.appendChild(rating1);
		    this.maleNodes += 2;
		    
		    if(this.maleArray[male].rating[1] != null){
			let date2 = document.createElement("H6")
			let date2text = document.createTextNode("DATE 2:");
			date2.appendChild(date2text);
			let rating2 = document.createElement("P");
			let fetchedrating2 = document.createTextNode("rating : " +this.maleArray[male].rating[1]);
			rating2.appendChild(fetchedrating2);
			bignav.appendChild(date2);
			bignav.appendChild(rating2);
			this.maleNodes += 2;
			
			if(this.maleArray[male].rating[2] != null){
			    let date3 = document.createElement("H6")
			    let date3text = document.createTextNode("DATE 3:");
			    date3.appendChild(date3text);
			    let rating3 = document.createElement("P");
			    let fetchedrating3 = document.createTextNode("rating : " +this.maleArray[male].rating[2]);
			    rating3.appendChild(fetchedrating3);
			    bignav.appendChild(date3);
			    bignav.appendChild(rating3);
			    this.maleNodes += 2;
			    
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
		    this.closeFemaleNav(female);
		    repetitiveFemale = false;
		}
		else {
		    this.closeFemaleNav(female);
		    let bignav = document.getElementById("mySidenavf");		    
		    Fbutton = document.getElementById(female);
		    Fbutton.style.color = "darkgreen";
		    let fun = this.femaleArray[female-10].name;
		    let newText = document.createTextNode(fun);
		    let nav1 = document.createElement("Div");
		    let image = document.createElement('img');
		    image.src = this.femaleArray[female-10].picpath;
		    image.width = 350;
		    image.height = 250;
		    nav1.appendChild(newText);
		    bignav.replaceChild(nav1, bignav.childNodes[1]);
		    bignav.replaceChild(image, bignav.childNodes[2]);

		    		    /* RATINGS */
		    if (this.femaleArray[female-10].rating[0] != null){
			
			let date1 = document.createElement("H6")
			let date1text = document.createTextNode("DATE 1:");
			date1.appendChild(date1text);
			let rating1 = document.createElement("P");
			let fetchedrating1 = document.createTextNode("rating :" + this.femaleArray[female-10].rating[0]);
			rating1.appendChild(fetchedrating1);
			
			if (this.femaleNode != 2) {
			
			    bignav.replaceChild(date1, bignav.childNodes[3]);
			    bignav.replaceChild(rating1, bignav.childNodes[4]);
			}
			else {
			    
			    bignav.appendChild(date1);
			    bignav.appendChild(rating1);
			    this.femaleNode += 2;
			}
			
			if(this.femaleArray[female-10].rating[1] != null){
			    
			    let date2 = document.createElement("H6")
			    let date2text = document.createTextNode("DATE 2:");
			    date2.appendChild(date2text);			    
			    let rating2 = document.createElement("P");
			    let fetchedrating2 = document.createTextNode("rating :" + this.femaleArray[female-10].rating[1]);
			    rating2.appendChild(fetchedrating2);
			    if (this.femaleNode != 4) {
				
				bignav.replaceChild(date2, bignav.childNodes[5]);
				bignav.replaceChild(rating2, bignav.childNodes[6]);
			    }
			    else {
				
				bignav.appendChild(date2);
				bignav.appendChild(rating2);
				this.femaleNode += 2;
				
			    }			    
			    
			    if(this.femaleArray[female-10].rating[2] != null){
				
				let date3 = document.createElement("H6")
				let date3text = document.createTextNode("DATE 3:");
				date3.appendChild(date3text);
				let rating3 = document.createElement("P");
				let fetchedrating3 = document.createTextNode("rating :" + this.femaleArray[female-10].rating[2]);
				rating3.appendChild(fetchedrating3);
				
				if (this.femaleNode != 6) {
				    
				    bignav.replaceChild(date3, bignav.childNodes[7]);
				    bignav.replaceChild(rating3, bignav.childNodes[8]);
				}
				else {
				    
				    bignav.appendChild(date3);
				    bignav.appendChild(rating3);
				    this.femaleNode += 2;				
				}
			    }
			}
		    }

		    this.openFemaleNav(female);
		    repetitiveFemale = true;
		}
	    }
	    else {
		hasOpenedF = true;
		repetitiveFemale = true;		
		Fbutton = document.getElementById(female);
		Fbutton.style.color = "darkgreen";
		let bignav = document.getElementById("mySidenavf");
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
		this.femaleNode += 2;

				/* RATING */
		/* Om det finns rating, så läses den in */
		if (this.femaleArray[female-10].rating[0] != null){
		    let date1 = document.createElement("H6")
		    let date1text = document.createTextNode("DATE 1:");
		    date1.appendChild(date1text);
		    let rating1 = document.createElement("P");
		    let fetchedrating1 = document.createTextNode("rating : "+this.femaleArray[female-10].rating[0]);
		    rating1.appendChild(fetchedrating1);
		    bignav.appendChild(date1);
		    bignav.appendChild(rating1);
		    this.femaleNode += 2;

		    if(this.femaleArray[female-10].rating[1] != null){
			let date2 = document.createElement("H6")
			let date2text = document.createTextNode("DATE 2:");
			date2.appendChild(date2text);
			bignav.appendChild(date2);
			let rating2 = document.createElement("P");
			let fetchedrating2 = document.createTextNode("rating : "+this.femaleArray[female-10].rating[1]);
			rating2.appendChild(fetchedrating2);
			bignav.appendChild(date2);
			bignav.appendChild(rating2);
			
			this.femaleNode += 2;
			
			if(this.femaleArray[female-10].rating[2] != null){
			    let date3 = document.createElement("H6")
			    let date3text = document.createTextNode("DATE 3:");
			    date3.appendChild(date3text);			  
			    bignav.appendChild(date3);
			    let rating3 = document.createElement("P");
			    let fetchedrating3 = document.createTextNode("rating : "+this.femaleArray[female-10].rating[2]);
			    rating3.appendChild(fetchedrating3);
			    bignav.appendChild(date3);
			    bignav.appendChild(rating3);
			    
			    this.femaleNode += 2;
			}
		    }
		}
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
	closeFemaleNav: function(female) {
	    document.getElementById("mySidenavf").style.width = "0";
	    Fbutton.style.color = "darkred";
	    this.currFemale = -1;
   
	},
	closeMaleNav: function(male) {
	    document.getElementById("mySidenav").style.width = "0";
	    button.style.color = "darkblue";
	    this.currMale = -1;
	},
	startEvent: function() {
	    
	    let p = document.getElementById("phase");
	    let oldtimes = document.getElementById("times");
	    if (this.phase < 3){
		let i = 0;
		/* simulate ratings from 0 to 5*/ 
		for (i ; i < 10; i++) {
		    this.maleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		    this.femaleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		}
		
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
		let i = 0;
		for (i ; i < 10; i++) {
		    this.maleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		    this.femaleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		}
		let newphase = document.createElement("Div");
		let updatephase = document.createTextNode("Event Completed");
		newphase.appendChild(updatephase);
		p.replaceChild(newphase, p.childNodes[0]);
		let times = document.createElement("P");
		let newTimes = document.createTextNode("Event completed");
		times.appendChild(newTimes);
		oldtimes.replaceChild(times, oldtimes.childNodes[0]);
	    }
	    let newfirstIndex = this.femaleArray[9];


	    /* Moves the female buttons */
	    this.femaleArray.unshift(newfirstIndex);
	    this.femaleArray[0] = this.femaleArray[10];
	    this.femaleArray.splice(10);
	    for (var i = 0; i < this.femaleArray.length; i++){
		this.femaleArray[i].matchId += 1;
		this.femaleArray[i].id += 1;
	    }
	    this.femaleArray[0].id = 10;
	    this.femaleArray[0].matchId = 0;
	    this.closeFemaleNav(10);
	    this.closeMaleNav(0);
	       
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

		this.femaleArray[to].id = to +10;
		this.femaleArray[from].id = from+10;
		

		
		this.closeFemaleNav();
		repetitiveFemale = false;
		this.closeMaleNav();
		repetitiveMale = false;
		this.currFemale = -1;
		this.currMale = -1;
	    }
	},

	tablePlacementButton: function() {
	    console.log("table placement clicked");
	    document.getElementById("tablePlacement").style.display = "block";
	    this.getMatches();
	},
	getMatches: function() {
	    for (let i = 0; i < this.matches.length; i++) {
		//this.matches[i] = {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, matchNum : i};
		this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, matchNum : i});
		
	    }
	    console.log(this.matches);
	},
	closeTablePlacement: function() {
	    console.log("table placement modal closed");
	    document.getElementById("tablePlacement").style.display = "none";
	},
	dragstartHandler: function(ev) {
	    ev.dataTransfer.setData("text", ev.srcElement.id);
	    console.log(ev.srcElement.id);
	},
	allowDrop : function(ev) {
	    ev.preventDefault();
	},
	dropHandler: function(ev) {
	    ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
	    ev.target.appendChild(document.getElementById(data));
	}
    },
    
    //to get matches array before page loads
    beforeMount(){
	this.getMatches()
    },
})

