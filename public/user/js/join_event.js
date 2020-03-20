/*const name = document.getElementById('eventcode')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
	let messages = []
	if (eventcode.value === '' || eventcode.value == null){
		messages.push('Eventcode is required')
	}
	
	if(eventcode.value.length <= 6){
		messages.push('Password must be longer than 6 characters')
	}
	
		if(eventcode.value .length >= 20){
		messages.push('Password must be less than 20 characters')
	}
	
	if(messages.length > 0){
		e.preventDefault()
		errorElement.innerText = messages.join(', ')
	}
})
*/

'use strict';
const socket = io();


const vm = new Vue({
    el: '#app',
    
    data: {
	code: '',
	userHome: 'user_home.html',
	joinEvent: 'event_wait.html',
    },
    methods: {
	userHomeClick: function() {
	    document.location.href = this.userHome;
	},
	joinEventClick: function(){
	    if (this.code == "XYC831"){
		socket.emit('userJoined');
		document.location.href = this.joinEvent;
	    }
	    else {
		console.log(this.code);
		alert("that's the wrong numba!");
	    }
		
	},
	

	},
})
