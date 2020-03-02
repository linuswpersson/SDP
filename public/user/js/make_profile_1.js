'use strict';
const socket = io();


const vm = new Vue({
    el: '#input_section',
    data: {
	users: {},
	fullname : '',
	phone : '',
	gender : '',
	seeking : '',
	
	next : 'make_profile_2.html',
	back : 'user_home.html',
    },
    /* Fetch the array from app.js */
    created: function() {
	socket.on('getusers', function(data) {
	    this.users = data.users;    
	}.bind(this));
    },
    methods: {
	/* YEEP detta fungerar ej, jobbar på det */
	sendInfo: function() {    /* placeholder-function */
	    var dataArray = [];
	    dataArray.push(this.fullname);
	    dataArray.push(this.phone); 
	    dataArray.push(this.gender);
	    dataArray.push(this.seeking);
	    socket.emit('saveUsers', function(dataArray){
		this.users.push(dataArray);
	    })
	    console.log(this.users[0]);
	    this.testInfo();
	},
	testInfo: function(){
	    socket.emit('printUsers', function(data){
	    console.log(data);
	    })},

	nextClick: function() {
	    this.sendInfo();
	    document.location.href = this.next;
	},

	backClick: function() {
	    document.location.href = this.back;
	},
    },
})
