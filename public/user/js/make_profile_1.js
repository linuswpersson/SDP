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
	email : '',
	userIndex: 0,
	femaleIndex: 0,
	
	next : 'make_profile_2.html',
	back : 'user_home.html',
    },
    /* Fetch the array from app.js aswell as the userIndex */
    created: function() {
	socket.on('getUsers', function(data) {
	    if (data.users.length - 1 == data.userIndex) {
		this.userIndex = data.userIndex;
		this.fullname = data.users[this.userIndex].name;
		sessionStorage.setItem("UniqueId", data.userIndex);
		this.phone = data.users[this.userIndex].phone;
		this.gender = data.users[this.userIndex].gender;
		this.seeking = data.users[this.userIndex].seeking;
	    }

	}.bind(this));
    },
    methods: {
	/* Lyckas spara skiten, måste bara ha en variabel kan incrementas nu för index. */
	sendInfo: function() {    /* placeholder-function */

	    /* Saved for userInfo, remember to use .userInfo if you want to use the information stored */
	    socket.emit('saveUsers', {
		gender: this.gender,
		name: this.fullname,
		seeking: this.seeking,
		id: this.userIndex,
		phone: this.phone,
		email: this.email,
		matched: false,
		picpath: '',
		bubbles: '',
	    });
	    this.testInfo();
	}, /* Confirming that this shit is actually stored */	
	testInfo: function(){
	    socket.emit('printUser', function(print){
		console.log('global storage with pointer on last submit');
	    });

	},
	nextClick: function() {
	    if(this.fullname != '' && this.phone != '' && this.seeking != '' && this.gender != '' && this.phone.length >= 10) {
		this.sendInfo();
		document.location.href = this.next;
	    }
	    
	},
    },
})
