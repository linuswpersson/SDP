const socket = io();

const vm = new Vue({
    el: '#pageWrapper',

    data: {
	contactPage: 'contact_page.html',
	userPreviousMatches: [{name: 'no data from server1', imgPath: ''}, {name: 'no data from server2', imgPath: ''}, {name: 'no data from server3', imgPath: ''}],
	checkedDate: [],
	
    },

    methods: {
	nextClick: function() {
	    //printing which checkbox been checked
	    console.log(this.checkedDate);
	    socket.emit('userShareContactInfo', {checkedDate: this.checkedDate});
	    document.location.href = this.contactPage;
	},
    },
    created: function(){
	socket.on('getUserMatches', function(prevMatches) {
	    console.log(this.userPreviousMatches);
	    this.userPreviousMatches = prevMatches.matches;
	    console.log(prevMatches);
	    console.log(this.userPreviousMatches);
	}.bind(this));
    },
    
})
