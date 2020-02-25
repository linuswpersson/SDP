const vm = new Vue({
    el: '#buttons',
    data: {
	userHome: 'user_home.html',
    },
    methods: {
	userHomeClick: function() {
	    document.location.href = this.userHome;
	},

	},
})
