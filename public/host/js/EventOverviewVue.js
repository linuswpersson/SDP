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
	times: [],
	dateSpan: [],
	currMale : -1,
	currFemale : -1,
	rating: [],
	isMale: true,
	userName: '',
	
	function(){
	    return
	    { 
	    }
	},
	
	maleArray : [
	    {name : 'Johan', matchId : 10, id : 0, image: 20, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Erik', matchId : 11, id : 1, image: 21, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Hjalmar', matchId : 12, id : 2, image: 22, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Lars', matchId : 13, id : 3, image: 23, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Åke', matchId : 14, id : 4, image: 24, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Tor', matchId : 15, id : 5, image: 25, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Valdermar', matchId : 16, id : 6, image: 26, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Jan', matchId : 17, id : 7, image: 27, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Olle', matchId : 18, id : 8, image: 28, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Rolf', matchId : 19, id : 9, image: 29, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	],


	femaleArray : [
            {name : 'Lina', matchId : 0, id : 10, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Frida', matchId : 1, id : 11, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Mona Lisa', matchId : 2, id : 12, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Erika', matchId : 3, id : 13, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Linn', matchId : 4, id : 14, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Simone', matchId : 5, id : 15, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Julia', matchId : 6, id : 16, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Bennilina', matchId : 7, id : 17, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Johanna', matchId : 8, id : 18, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Stina', matchId : 9, id : 19, picpath: '../img/plus.png', rating: [null, null, null], bubbleArray: [], previousDate: []},
	],
	
	matches : Array(10),
    },
    created: function(){

	socket.on('userHasJoined', function(data){
	    location.reload();
	});
	
	socket.on('updateHostRating', function(data){
	    this.rating = data.rating;
	    console.log(data.rating);
	    console.log(this.rating);
	    loadRating(data);

	    /* Försök att uppdatera skiten när någon klickar på join event-knappen  */
	    /* Problemet är att allt lokalt försvinner när vi uppdaterar, alltså är vi tvugna att möjligtvis emitta precis allt som randomgenererats + lägga tillbaka dem igen */
	    /* Har studerat webhooks och skit men det fungerar som vanligt inte */
	});
		
	socket.on('hello', function(data) {
	    if (data.name != ''){
		if (data.gender[0] == ('M')){
		    this.maleArray[0].name = data.name;
		    this.maleArray[0].picpath = data.picpath;
		    this.maleArray[0].bubbleArray.splice(data.userBubbles.length);
		    this.maleArray[0].bubbleArray = data.userBubbles;
		}
		else {
		    this.femaleArray[0].name = data.name;
		    this.femaleArray[0].picpath = data.picpath;
		    this.femaleArray[0].bubbleArray.splice(data.userBubbles.length);
		    this.femaleArray[0].bubbleArray = data.userBubbles;
		    this.isMale = false;

		}
	    }
	    this.rating = data.rating;
	    this.eventName = data.eventName;
	    this.eventTimeFrom = data.eventTimeFrom;
	    this.eventTimeTo = data.eventTimeTo;
	    this.eventMessage = data.eventMessage;
	    this.eventDate = data.eventDate;
	    this.eventEmail = data.eventEmail;
	    this.eventLocation = data.eventLocation;
	    this.calculateDateTimes();
	    this.userName = data.name;
	    load();
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
	    socket.emit('sendDateTimes',{times: this.times, dateSpan: this.dateSpan});
	},

	maleClick: function(male) {
	    if (this.currMale == male) {
		this.closeMaleNav(male);
	    }
	    else {
		this.closeMaleNav(male);
		let name = this.maleArray[male].name;
		let nameNode = document.createTextNode(name);
		let nameElement = document.getElementById("mySidenavName");
		nameElement.appendChild(nameNode);

		document.getElementById("mySidenavImg").src = this.maleArray[male].picpath;

		let v = true;
		for(let i = 1; v == true; i++){
		    v = this.maleDateHandler(male, i);
		}

		var bubbleElement = document.getElementById("mySidenavBubbles");
		var bubbleLength = this.maleArray[male].bubbleArray.length;
		for(let i = 0; i < bubbleLength; i++) {
		    let currBubName = document.createTextNode(this.maleArray[male].bubbleArray[i].name);
		    let currBubBox = document.createElement("div");
		    currBubBox.appendChild(currBubName);
		    bubbleElement.appendChild(currBubBox);
		}
		button = document.getElementById(male);
		button.style.color = "darkgreen";
		this.openMaleNav(male);
	    }
	},
	femaleClick: function(female) {
	    if (this.currFemale == female) {
		this.closeFemaleNav(female);
	    }
	    else {
		this.closeFemaleNav(female);
		let name = this.femaleArray[female-10].name;
		let nameNode = document.createTextNode(name);
		let nameElement = document.getElementById("mySideFnavName");
		nameElement.appendChild(nameNode);
		
		document.getElementById("mySideFnavImg").src = this.femaleArray[female-10].picpath;

		let v = true;
		for(let i = 1; v == true; i++){
		    v = this.femaleDateHandler(female, i);
		}

		var bubbleElement = document.getElementById("mySideFnavBubbles");
		var bubbleLength = this.femaleArray[female-10].bubbleArray.length;
		for(let i = 0; i < bubbleLength; i++) {
		    let currBubName = document.createTextNode(this.femaleArray[female-10].bubbleArray[i].name);
		    let currBubBox = document.createElement("div");
		    currBubBox.appendChild(currBubName);
		    bubbleElement.appendChild(currBubBox);
		}
		button = document.getElementById(female);
		button.style.color = "darkgreen";
		this.openFemaleNav(female);
	    }
	}, 

	/* inserts the specific Date nodes of the argument (male) and argument (date) into the maleNav. returns bool-value if the spicific date-info was found */
	maleDateHandler: function(male, date) {
	    if(this.maleArray[male].rating[date-1] != null) {
		var dateElement = document.getElementById("mySidenavDates");
		let dateHeader = document.createElement("H6");
		let dateText = document.createTextNode("DATE " + date + ":");
		dateHeader.appendChild(dateText);
		let dateWith = document.createElement("p");
		let dateWithWho = document.createTextNode("Date with : " + this.maleArray[male].previousDate[date-1].name);
		dateWith.appendChild(dateWithWho);
		let ratingElement = document.createElement("p");
		let fetchedRating = document.createTextNode("rating : "+this.maleArray[male].rating[date-1]);
		ratingElement.appendChild(fetchedRating);
		dateElement.appendChild(dateHeader);
		dateElement.appendChild(dateWith);
		dateElement.appendChild(ratingElement);
		return true;
	    }
	    else {
		return false;
	    }
	},

	femaleDateHandler: function(female, date) {
	    if(this.femaleArray[female-10].rating[date-1] != null) {
		var dateElement = document.getElementById("mySideFnavDates");
		let dateHeader = document.createElement("H6");
		let dateText = document.createTextNode("DATE " + date + ":");
		dateHeader.appendChild(dateText);
		
		let dateWith = document.createElement("p");
		let dateWithWho = document.createTextNode("Date with : " + this.femaleArray[female-10].previousDate[date-1].name);
		dateWith.appendChild(dateWithWho);
		let ratingElement = document.createElement("p");
		let fetchedRating = document.createTextNode("rating : "+this.femaleArray[female-10].rating[date-1]);
		ratingElement.appendChild(fetchedRating);
		dateElement.appendChild(dateHeader);
		dateElement.appendChild(dateWith);
		dateElement.appendChild(ratingElement);
		return true;
	    }
	    else {
		return false;
	    }
	},
	
	openMaleNav: function(male) {
	    document.getElementById("mySidenav").style.width = "33vw";
	    this.currMale = male;
	    
	},
	openFemaleNav: function(female) {
	    document.getElementById("mySideFnav").style.width = "33vw";
	    this.currFemale = female;
	},
	closeFemaleNav: function(female) {
	    document.getElementById("mySideFnav").style.width = "0";
	    if(this.currFemale != -1) {
		document.getElementById(this.currFemale).style.color = "darkred";

		var nameElement = document.getElementById("mySideFnavName");
		nameElement.removeChild(nameElement.childNodes[0]);

		var datesElement = document.getElementById("mySideFnavDates");
		var datesLength = datesElement.childNodes.length - 1;
		for(; -1 < datesLength; datesLength--) {
		    datesElement.removeChild(datesElement.childNodes[datesLength]);
		}

		var bubbleElement = document.getElementById("mySideFnavBubbles");
		var bubbleLength = bubbleElement.childNodes.length - 1;
		for(; -1 < bubbleLength; bubbleLength--) {
		    bubbleElement.removeChild(bubbleElement.childNodes[bubbleLength]);
		}
		this.currFemale = -1;
	    }
	},
	
	/* Closes the maleNav and removes the current Name, Date, and bubble nodes from the Nav. Also sets currMale to -1 */
	closeMaleNav: function(male) {
	    document.getElementById("mySidenav").style.width = "0";
	    if(this.currMale != -1) {
		document.getElementById(this.currMale).style.color = "darkblue";

		var nameElement = document.getElementById("mySidenavName");
		nameElement.removeChild(nameElement.childNodes[0]);
		
		var datesElement = document.getElementById("mySidenavDates");
		var datesLength = datesElement.childNodes.length - 1;
		for(; -1 < datesLength; datesLength--) {
		    datesElement.removeChild(datesElement.childNodes[datesLength]);
		}

		var bubbleElement = document.getElementById("mySidenavBubbles");
		var bubbleLength = bubbleElement.childNodes.length - 1;
		for(; -1 < bubbleLength; bubbleLength--) {
		    bubbleElement.removeChild(bubbleElement.childNodes[bubbleLength]);
		}
		
		this.currMale = -1;
	    }
	},
	startTheEvent: function() {
	    
	},
	startEvent: function() {
	    
	    socket.emit('signal', {phase: this.phase}); 
	},
	nextStage: function() {
	    
	    
	    let p = document.getElementById("phase");
	    let oldtimes = document.getElementById("times");

	    if (this.phase < 3) {
		let i = 0;
		/* simulate ratings from 0 to 5*/ 
		for (i ; i < 10; i++) {
		    //ändrade här så att ett objekt med namn och bild läggs in i previous date
		    //som jag ska använda för att skicka till user
		    this.maleArray[i].previousDate[this.phase-1] = {name: this.femaleArray[i].name, imgPath: this.femaleArray[i].picpath};
		    this.femaleArray[i].previousDate[this.phase-1] = {name: this.maleArray[i].name, imgPath: this.maleArray[i].picpath};
		    this.maleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		    this.femaleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		}
		
		if (this.isMale){
		    this.maleArray[0].rating[this.phase-1] = this.rating[this.phase-1];
		}		    	    
		else {
		    this.femaleArray[this.phase-1].rating[this.phase-1] = this.rating[this.phase-1];
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
		    //ändrade här så att ett objekt med namn och bild läggs in i previous date
		    //som jag ska använda för att skicka till user
		    this.maleArray[i].previousDate[this.phase-1] = {name: this.femaleArray[i].name, imgPath: this.femaleArray[i].picpath};
		    this.femaleArray[i].previousDate[this.phase-1] = {name: this.maleArray[i].name, imgPath: this.maleArray[i].picpath};
		    this.maleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		    this.femaleArray[i].rating[this.phase-1] = Math.floor(Math.random() * 5) + 1;
		}
		if (this.isMale){
		    this.maleArray[0].rating[this.phase-1] = this.rating[this.phase-1];
		}		    	    
		else {
		    this.femaleArray[this.phase-1].rating[this.phase-1] = this.rating[this.phase-1];
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
	  
	    

	    let prevMatches = [];
	    if(this.isMale) {
		prevMatches = this.maleArray[0].previousDate; 
	    } else {
		let indexOfUser = 0;
		for (let i = 0; i < this.femaleArray.length; i++) {
		    if (this.femaleArray[i].name == this.userName) {
			indexOfUser = i;
		    }
		}
		
		prevMatches = this.femaleArray[indexOfUser].previousDate;
	    }
	    console.log(prevMatches);
	    socket.emit('sendUserMatches', prevMatches);

	    
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

	////
	//// TABLEPLACEMENT CODE
	//// 
	tablePlacementButton: function() {
	    console.log("table placement clicked");
	    document.getElementById("tablePlacement").style.display = "block";
	    this.updateMatches();
	},
	getMatches: function() {
	    for (let i = 0; i < this.matches.length; i++) {
		this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, tableNum : i});
	    }
	    console.log(this.matches);
	},
	
	updateMatches: function (){
	    for (let i = 0; i < this.matches.length; i++) {
		if(this.matches[i].maleName != this.maleArray[i].name || this.matches[i].femaleName != this.femaleArray[i].name) {
		    this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, tableNum : i});
		}
		if(this.matches[i].tableNum == 'e') {
		    this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, tableNum : 0});
		}
		
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
	    console.log(ev.target.id);
	    console.log(ev.target);
	    this.matches[data.slice(-1)].tableNum = ev.target.id.slice(-1);
	    console.log(this.matches);
	    
	},
	confirmTablePlacement: function() {
	    console.log(this.matches);
	    socket.emit('sendTablePlacement', this.matches);
	},
	////
	//// TABLEPLACEMENT CODE END
	//// 
    },
    
    //to get matches array before page loads
    beforeMount(){
	this.getMatches();
	socket.emit('sendTablePlacement', this.matches);
    },
})

function load(){
    vm.$forceUpdate();	  
}
function loadRating(data){
    vm.$set(vm.rating, 0, data.rating[0]);
    vm.$set(vm.rating, 1, data.rating[1]);
    vm.$set(vm.rating, 2, data.rating[2]);
    vm.$forceUpdate();
}
