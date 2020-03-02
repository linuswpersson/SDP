'use strict';
const socket = io();

/* Have to construct something specific for one user before I can properly save reviews */
const vm = new Vue({
    el: '#buttons',
    data: {
	meetingList: 'meeting_list.html',
	ratingMessage: '',
	rating: '',
    },
    methods: {
	userHomeClick: function() {
	    document.location.href = this.meetingList;
	},
	//Sends the data to app.js, where it is stored.
	saveRating: function(rating, message) {
	    socket.emit('saveRating', rating, message, function(data) { 
	//	console.log(rating); // data will be 'tobi says woot'
		//console.log(message);
	});
	},
	//Print is simply to confirm that everything has been stored in app.js.
	//One could easily import them with socket.on
	print: function() {
	    socket.emit('printALL', function(print){
		console.log(print);
	    })
	}
    }})

/* 5-star rating method*/
//Hur incrementar jag detta?! Inte fokus atm.
document.querySelector('#rating').addEventListener('click', function (e) {
    let action = 'add';
    let rating = 0;
    for (const span of this.children) {
        span.classList[action]('active');
        if (span === e.target) action = 'remove';

    }
    vm.saveRating(rating, vm.ratingMessage);
    vm.print();
   
});


    
