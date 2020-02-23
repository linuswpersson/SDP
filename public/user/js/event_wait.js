const vm = new Vue({
    el: '#buttons',
    data: {
	joinEvent: 'join_event.html',
	nextEvent: 'meeting_table.html',
    },
    methods: {
	joinEventClick: function() {
	    document.location.href = this.joinEvent;
	},
	nextEventClick: function(){
		document.location.href = this.nextEvent;
	},

	},
})
