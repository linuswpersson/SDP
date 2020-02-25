const vm = new Vue({
    el: '#buttons',
    data: {
	infoHelp: '',
	joinSeat: 'dating_progress.html',
    },
    methods: {
	infoHelpClick: function() {
	    document.location.href = this.infoHelp;
	},
	joinSeatClick: function(){

	    document.location.href = this.joinSeat;
		
    },

	},
})