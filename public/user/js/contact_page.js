const vm = new Vue ({
    el: '#contactsWrapper',

    data: {
	userHome: 'user_home.html'
    },

    methods: {
	showInfo: function() {
	    document.getElementById("myModal").style.display = "block";
	},
	closeModal: function() {
	    document.getElementById("myModal").style.display = "none";	    
	},
	nextClick: function() {
	    document.location.href = this.userHome;
	},
	
    },
})
