const socket = io();

const vm = new Vue({
    el: '#pageWrapper',

    data: {
	contactPage: 'contact_page.html',
	userPreviousMatches: [{name: 'no data from server1', imgPath: ''}, {name: 'no data from server2', imgPath: ''}, {name: 'no data from server3', imgPath: ''}],
	checkedDate: [],
	privID: 0,
	
    },

    methods: {
	nextClick: function() {
	    //printing which checkbox been checked
	    console.log(this.checkedDate);
	    socket.emit('userShareContactInfo', {names: this.checkedDate, Id: this.privID});
	    document.location.href = this.contactPage;
	},
    },
    created: function(){
	socket.on('getUserMatches', function(prevMatches) {
	    this.privID = sessionStorage.getItem("UniqueId");
	    this.userPreviousMatches = prevMatches.matches[this.privID];
	    console.log(this.userPreviousMatches);
	}.bind(this));
    },
    
})
