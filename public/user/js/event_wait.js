const socket = io();

const vm = new Vue({
    el: '#content',
    data: {
	joinEvent: 'join_event.html',
	nextEvent: 'meeting_table.html',
	eventName: '',
	eventStartTime: '',
	times: '',
	dateSpan: '',
	name: '',
	
    },
    methods: {
	joinEventClick: function() {
	    document.location.href = this.joinEvent;
	},
	nextEventClick: function(){
		document.location.href = this.nextEvent;
	},

    },
    created: function() {
	socket.on('signalFrom', function(){
	    document.location.href = 'meeting_table.html';
	}.bind(this));
	socket.on('getEventInfo', function(evInfo) {
	    this.eventName = evInfo.eventName;
	    this.eventStartTime = evInfo.eventStartTime;
	    this.times = evInfo.times;
	    this.dateSpan = evInfo.dateSpan;
	    console.log(this.eventName + this.eventStartTime + this.times + this.dateSpan);
	}.bind(this));

    },
    
})
