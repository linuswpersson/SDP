'use strict';
const socket = io();

const vm = new Vue({
    el: '#content',
    data: {
	user: [],
    },
    
    created: function() {
	socket.on('responseDoneLast', function(data){
	    document.location.href = 'contact_page.html';
	}.bind(this));
	
	socket.on('responseDone', function(data) {
	    document.location.href = 'contact_page.html'; 	   
	}.bind(this));
	
	socket.emit('isDone');

    },   
})
