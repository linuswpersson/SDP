'use strict';
const socket = io();


const vm = new Vue({
    el: '#app',
    data: {
	started: false,
	done: false,
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
	isMale: [],
	userName: [],

	bubbleArray : [
	    {name : 'Music', selected : false},
	    {name : 'Art', selected : false},
	    {name : 'Sport', selected : false},
	    {name : 'Food', selected : false},
	    {name : 'Fashion', selected : false},
	    {name : 'Outdoors', selected : false},
	    {name : 'Travel', selected : false},
	    {name : 'Party', selected : false},
	    {name : 'Tv', selected : false},
	    {name : 'Excercise', selected : false},
	    {name : 'Lifestyle', selected : false},
	    {name : 'Video-games', selected : false},
	    {name : 'Movies', selected : false},
	    {name : 'Animales', selected : false},
	    {name : 'Drawing', selected : false},
	    {name : 'Coding', selected : false},
	    {name : 'Writing', selected : false},
	    {name : 'Reading', selected : false},
	    {name : 'Plants', selected : false},
	],
	
	maleArray : [

	    {name : 'Johan', matchId : 10, id : 0, image: 20, picpath: 'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Erik', matchId : 11, id : 1, image: 21, picpath: 'https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Hjalmar', matchId : 12, id : 2, image: 22, picpath: 'https://images.unsplash.com/photo-1508216404415-a35220fab80e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Lars', matchId : 13, id : 3, image: 23, picpath: 'https://images.unsplash.com/photo-1579038773867-044c48829161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Åke', matchId : 14, id : 4, image: 24, picpath: 'https://images.unsplash.com/photo-1479685894911-37e888d38f0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Tor', matchId : 15, id : 5, image: 25, picpath: 'https://images.unsplash.com/photo-1546434946-3e8a5564945d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Valdermar', matchId : 16, id : 6, image: 26, picpath: 'https://images.unsplash.com/photo-1573156770063-01139113dbdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Jan', matchId : 17, id : 7, image: 27, picpath: 'https://images.unsplash.com/photo-1507864676385-e69c0ca53dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Olle', matchId : 18, id : 8, image: 28, picpath: 'https://images.unsplash.com/photo-1544048242-e9b516820f97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Rolf', matchId : 19, id : 9, image: 29, picpath: 'https://images.unsplash.com/photo-1552504462-0c6b5fef0925?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	],


	femaleArray : [
            {name : 'Lina', matchId : 0, id : 10, picpath: 'https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Frida', matchId : 1, id : 11, picpath: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Mona Lisa', matchId : 2, id : 12, picpath: 'https://images.unsplash.com/photo-1423742774270-6884aac775fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Erika', matchId : 3, id : 13, picpath: 'https://images.unsplash.com/photo-1560768686-52887fe71392?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Linn', matchId : 4, id : 14, picpath: 'https://images.unsplash.com/photo-1521118224700-e216379d1ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Simone', matchId : 5, id : 15, picpath: 'https://images.unsplash.com/photo-1520989125854-939a8bdfa81e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Julia', matchId : 6, id : 16, picpath: 'https://images.unsplash.com/photo-1563306406-e66174fa3787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Bennilina', matchId : 7, id : 17, picpath: 'https://images.unsplash.com/photo-1567850179641-1d2f8bec55cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Johanna', matchId : 8, id : 18, picpath: 'https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	    {name : 'Stina', matchId : 9, id : 19, picpath: 'https://images.unsplash.com/photo-1505685679686-2490cab6217d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', rating: [null, null, null], bubbleArray: [], previousDate: []},
	],
	
	matches : Array(10),

	currentMatches: [],
    },
    created: function(){

	for (let i  = 0; i < this.maleArray.length; i++){
	    for (let j = 0; j < 3; j++){
		this.maleArray[i].bubbleArray.push(this.bubbleArray[Math.floor(Math.random() * this.bubbleArray.length)]);
	    }
	    for (let j = 0; j < 3; j++){
		this.femaleArray[i].bubbleArray.push(this.bubbleArray[Math.floor(Math.random() * this.bubbleArray.length)]);
	    }
	}
	
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
		console.log(data.users[0].name);
		console.log(data.userIndex);
		let m = 0;
		let f = 0;
		for(let i = 0; i < data.userIndex; i++) {
		    if (data.users[i].gender[0] == ('M')){
			this.maleArray[m].name = data.users[i].name;
			this.maleArray[m].picpath = data.picpath[i];
			this.maleArray[m].bubbleArray.splice(data.userBubbles.length);
			this.maleArray[m].bubbleArray = data.userBubbles;
			this.userName.push(data.users[i].name);
			this.isMale.push(true);
			m += 1;
		    }
		    else {
			this.femaleArray[f].name = data.users[i].name;
			this.femaleArray[f].picpath = data.picpath[i];
			this.femaleArray[f].bubbleArray.splice(data.userBubbles.length);
			this.femaleArray[f].bubbleArray = data.userBubbles;
			this.isMale.push(false);
			this.userName.push(data.users[i].name);
			f += 1;
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
	    }
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


	superUpdater: function() {
	    this.updateMatches();
	    this.confirmTablePlacement();
	    let m = 0;
	    for (let i = 0; i < this.userName.length; i++){
	    if(this.isMale[i]){
		this.currentMatches.push({maleName : this.maleArray[m].name, malePic : this.maleArray[m].picpath,  femaleName : this.femaleArray[m].name, femalePic : this.femaleArray[m].picpath, users: this.userName});
		m += 1;
	    } else {
		let userIndex;
		for (let k = 0; k < this.femaleArray.length; k ++){
		    if(this.femaleArray[k].name == this.userName[i]){
			userIndex = k;
			break;
		    }
		}
		this.currentMatches.push({maleName : this.maleArray[userIndex].name, malePic : this.maleArray[userIndex].picpath,  femaleName : this.femaleArray[userIndex].name, femalePic : this.femaleArray[userIndex].picpath, users: this.userName});
	    }
	    }
	    
	    
	    console.log(this.currentMatches);
	    socket.emit('sendCurrentMatches', this.currentMatches);
	    this.currentMatches = [];
	    console.log("this.matches sent to server");
	    console.log(this.matches);
	    socket.emit('sendTablePlacement', this.matches);
	    socket.emit('signal', {phase: this.phase}); 
	},	

	startEvent: function() {
	    if (this.started == true){
		alert("Move on to the next event before starting a new one!");
		return;
	    }
	    socket.emit('signal', {phase: this.phase});
	    this.started = true;
	},
	doneClick: function(){
	    this.phase += 1;
	    socket.emit('signal', {phase: this.phase});
	    this.started = true;
	},

	nextStage: function() {
	    if (!this.started){
		alert("You need to start the meeting before you move on to the next one!");
		return;
	    }
	    else {
		this.started = false;
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
		    this.phase += 1;
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
		let m = 0;
		for (let i = 0; i < this.userName.length; i++){
		    if(this.isMale[i]) {
			prevMatches[i] = this.maleArray[m].previousDate;
			m += 1;
		    } else {
			for (let k = 0; k < this.femaleArray.length; k++) {
			    if (this.femaleArray[k].name == this.userName[i]) {
				prevMatches[i] = this.femaleArray[k].previousDate;
				break;
			    }
			}		
		    }
		}
		console.log(prevMatches);
		socket.emit('sendUserMatches', {prevMatches: prevMatches});

	    }
	    if (this.phase == 4) {
		this.done = true;
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
		this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, tableNum : i, users: this.userName});
	    }
	    console.log(this.matches);
	},
	
	updateMatches: function (){
	    for (let i = 0; i < this.matches.length; i++) {
		if(this.matches[i].maleName != this.maleArray[i].name || this.matches[i].femaleName != this.femaleArray[i].name) {
		    this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, tableNum : i, users: this.userName});
		}
		if(this.matches[i].tableNum == 'e') {
		    this.matches.splice(i, 1, {maleName : this.maleArray[i].name, femaleName : this.femaleArray[i].name, tableNum : 0, users: this.userName});
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
	    this.matches[data.slice(-1)].tableNum = Number(ev.target.id.slice(-1));	
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
	//socket.emit('sendTablePlacement', this.matches);
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
