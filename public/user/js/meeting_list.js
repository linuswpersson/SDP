const vm = new Vue({
    el: '#pageWrapper',

    data: {
	contactPage: 'contact_page.html'
	date1: {name: '', imgPath: ''},
	date2: {name: '', imgPath: ''},
	date3: {name: '', imgPath: ''},
    },

    methods: {
	nextClick: function() {
	     document.location.href = this.contactPage;
	},
    },
    created: function(){
	socket.on('getUserMatches', function(data) {
	    
	});
    },
    
})
