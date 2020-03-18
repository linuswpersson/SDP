'use strict';
const socket = io();

/* Have to construct something specific for one user before I can properly save reviews */
const vm = new Vue({
	el: '#apps',
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
			socket.emit('printALL', function(print) {
				console.log(print);
			})
		}
	}
});

/* 5-star rating method*/
//Hur incrementar jag detta?! Inte fokus atm.
/*document.querySelector('#rating').addEventListener('click', function (e) {
    let action = 'add';
    let rating = 5;
    for (const span of this.children) {
        span.classList[action]('active');
			rating++;
        if (span === e.target) action = 'remove';
			rating--;
    }
    vm.saveRating(rating, vm.ratingMessage);
    vm.print();
   
});*/

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
	
	vm.saveRating(num, vm.ratingMessage);
	vm.print();
}


