const vm = new Vue({
    el: '#buttons',
    data: {
	infoHelp: 'help',
    nextEvent: 'rating.html',
    },
    methods: {
	infoHelpClick: function() {
	    document.location.href = this.infoHelp;
	},
		nextEventClick: function(){
		document.location.href = this.nextEvent;
	},

	},
})




