'use strict';
const socket = io();


const vm = new Vue({
    el: '#input_section',
    data: {
	users: [],
	fullname : '',
	phone : '',
	gender : '',
	seeking : '',
	
	next : 'make_profile_2.html',
	back : 'user_home.html',
    },
    /* Fetch the array from app.js */
    created: function() {
	socket.on('getUsers', function(data) {
	    this.users = data.users;
	}.bind(this));
    },
    methods: {
	/* Lyckas spara skiten, måste bara ha en variabel kan incrementas nu för index. */
	sendInfo: function() {    /* placeholder-function */
	    var dataArray = [];
	    dataArray[0] = this.fullname;
	    dataArray[1] = this.phone; 
	    dataArray[2] = this.gender;
	    dataArray[3] = this.seeking;
	    this.users = dataArray;
	    socket.emit('saveUsers', {
		name: this.users
	    });
	    this.testInfo();
	},	
	testInfo: function(){
	    socket.emit('printUser', function(print){
		console.log(print);
	    })

	},
	nextClick: function() {
	    this.sendInfo();
	    document.location.href = this.next;
	},

	backClick: function() {
	    document.location.href = this.back;
	},
    },
})
