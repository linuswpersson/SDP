'use strict';
const socket = io();

/* Have to construct something specific for one user before I can properly save reviews */
const vm = new Vue({
    el: '#apps',
    data: {
	meetingList: 'meeting_list.html',
	ratingMessage: '',
	rating: '',
	phase: [null],
	privID: '',
	
    },
    created: function(){

	socket.on('updatePhase', function(data){
	    this.phase = data.phase;
//	    load();

	}.bind(this));
    },
    methods: {
	userHomeClick: function() {
	    if(this.phase > 4){
		this.saveRating(this.rating, this.ratingMessage);
		document.location.href = this.meetingList;
	    }
	    else {
		this.saveRating(this.rating, this.ratingMessage);
		document.location.href = 'event_wait.html';
	    }
	},
	//Sends the data to app.js, where it is stored.
	saveRating: function(rating, message) {
	    this.privID = sessionStorage.getItem("UniqueId");
	    console.log(rating);
	    socket.emit('saveRating', rating, this.phase, this.privID, ('\n'+ "Message: "+message), function(data) {
	    });
	},
	//Print is simply to confirm that everything has been stored in app.js.
	//One could easily import them with socket.on
	print: function() {
	    socket.emit('printALL', function(print) {
		console.log(print);
	    })
	}
    }
});

//initial setup
document.addEventListener('DOMContentLoaded', function() {
    let stars = document.querySelectorAll('.star');
    stars.forEach(function(star) {
	star.addEventListener('click', setRating);
    });   
    let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
});

function setRating(ev) {
	let span = ev.currentTarget;
	let stars = document.querySelectorAll('.star');
	let match = false;
	let num = 0;
	stars.forEach(function(star, index) {
		if (match) {
			star.classList.remove('rated');
		} else{
			star.classList.add('rated');
		}
		//are we currently looking at the span that was clicked
		if (star === span) {
			match = true;
			num = index + 1;
		}
	});
	document.querySelector('.stars').setAttribute('data-rating', num);
    vm.rating = num;
    vm.print();
}


function load(data) {
    vm.$set(vm.phase, 0, data.phase);
    vm.$forceUpdate();
    console.log(data.phase);
}
