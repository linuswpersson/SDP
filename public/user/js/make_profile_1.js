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
	userIndex: 0,
	
	next : 'make_profile_2.html',
	back : 'user_home.html',
    },
    /* Fetch the array from app.js aswell as the userIndex */
    created: function() {
	socket.on('getUsers', function(data) {
	    this.users = data.users;
	    this.userIndex = data.userIndex;
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

	    /* Saved for userInfo, remember to use .userInfo if you want to use the information stored */
	    socket.emit('saveUsers', {
		userInfo: dataArray,
	    });
	    this.testInfo();
	}, /* Confirming that this shit is actually stored */	
	testInfo: function(){
	    console.log('Index number, could be used to show amount.');
	    console.log(this.userIndex);
	    socket.emit('printUser', function(print){
		console.log('global storage with pointer on last submit');
		    console.log(print);
	    });
	    console.log('local storage only showing the first submit');
	
		console.log(this.users[0].userInfo);


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
