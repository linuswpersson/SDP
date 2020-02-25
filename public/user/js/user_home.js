const vm = new Vue({
    el: '#buttons',
    data: {
	joinEvent: 'join_event.html',
	eventTimes: 'event_times.html',
	editProfile: 'make_profile_1.html',
	recentMatches: 'contact_page.html'
    },
    methods: {
	joinEventClick: function() {
	    document.location.href = this.joinEvent;
	},
	eventTimesClick: function() {
	    document.location.href = this.eventTimes;
	},
	editProfileClick: function() {
	    document.location.href = this.editProfile;
	},
	recentMatchesClick: function() {
	    document.location.href = this.recentMatches;
	},
	
    },
    
})
