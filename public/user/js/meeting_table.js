'use strict';
const socket = io();

/*Scroll*/
Vue.directive('scroll', {
    inserted: function (el, binding) {
	let f = function (evt) {
	    if (binding.value(evt, el)) {
		window.removeEventListener('scroll', f)
	    }
	}
	window.addEventListener('scroll', f)
    }
})

const vm = new Vue({
    el: '#content',
    data: {
	privID: 0,
	date: 1,   	
	matches:[],
	myDate:'',
	myDatePic:'',
	myName:'',
	table:'',
	myDateInfo:[],
	joinSeat: 'rating.html',
	eventWait: 'event_wait.html',

	myDateNum: 1,
    },
    created: function() {
	/* Whenever an addOrder is emitted by a client (every open map.html is
	 * a client), the server responds with a currentQueue message (this is
	 * defined in app.js). The message's data payload is the entire updated
	 * order object. Here we define what the client should do with it.
	 * Spoiler: We replace the current local order object with the new one. */

	/*    socket.on('getUserMatches', function(data) {
	      this.myDateInfo.splice(data.matches.length);
	      this.myDateInfo = data.matches;
	      }.bind(this));*/


	socket.on('recieveTablePlacement', function(data) {
	    this.privID = sessionStorage.getItem("UniqueId");
	    console.log(this.privID);
	    this.myName = data.matches[this.privID].users[this.privID];	
	    this.matches.splice(data.matches.length);
	    this.matches = data.matches;
	    this.myDateInfo = data.info;

	    for (let match of this.matches) {
		if(match.maleName == match.users[this.privID] || match.femaleName == match.users[this.privID]){
		    this.table = match.tableNum + 1;
		}
	    }
	    console.log(this.table);
	    console.log(this.myName);
	    console.log(this.matches);
	}.bind(this));
	
	socket.on('sendPic', function(data) {
	    this.privID = sessionStorage.getItem("UniqueId");
	    console.log(this.privID);
	    this.myDateInfo = data.info[this.privID];
	    this.myName = this.myDateInfo.users[this.privID];
	    if (this.myName == this.myDateInfo.femaleName){
		this.myDate = this.myDateInfo.maleName;
		this.myDatePic = this.myDateInfo.malePic;
	    }
	    else {
		this.myDate = this.myDateInfo.femaleName;
		this.myDatePic = this.myDateInfo.femalePic;
	    }
	    console.log(this.myDateInfo.femaleName);	
	}.bind(this));

    },

    methods: {
	showResult: function(){
	    for(let i = 0; i<this.matches.length; i++){
		if(this.matches[i].maleName == this.myName){
		    this.table = this.matches[i].tableNum+1;
		    console.log(this.matches);
		    console.log(this.myDateInfo);
		    this.mydate = this.matches[i].femaleName;
		    this.myDatePic = this.myDateInfo[i].imgPath;
		    console.log(this.myDatePic);
		    /*this.mydate= this.myDateInfo[i].name;*/
		    /*				this.mydatePic= this.matches[i].femaleName;*/
		}
		else if(this.matches[i].femaleName == this.myName){
		    this.table = this.matches[i].tableNum+1;
		    this.mydate= this.matches[i].maleName;
		    /*				this.mydate= this.myDateInfo[i].name;*/
		}
	    };
	    console.log(this.matches);
	    console.log(this.myDateInfo);
	},
	handleScroll: function (evt, el) {
	    if (window.scrollY > 50) {
		el.setAttribute(
		    'style',
		    'opacity: 1; transform: translate3d(0, -10px, 0)'
		)
	    }
	    return window.scrollY > 100
	},
    	joinSeatClick: function(){

	    document.location.href = this.joinSeat;
	    
	},
    	backClick: function() {
	    document.location.href = this.eventWait;
	},
    }
})
