'use strict';
const socket = io();

const vm = new Vue({
    el: '#content',
    data: {
    },

    created: {
	socket.on('responseDone') {
	    document.location.href = 'contact_page.html';
	}
    },
})
