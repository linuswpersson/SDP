const vm = new Vue({
    el: '#buttons',
    data: {
	joinEvent: 'join_event.html',
    },
    methods: {
	joinEventClick: function() {
	    document.location.href = this.joinEvent;
	},

	},
})
