const vm = new Vue({
    el: '#buttons_section',
    data: {
	next : 'bubbles.html',
	back : 'make_profile_2.html',
    },
    methods: {
	
	backClick: function() {
	    document.location.href = this.back;
	},
    },
})
