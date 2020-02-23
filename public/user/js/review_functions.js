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

/* 5-star rating method*/
document.querySelector('#rating').addEventListener('click', function (e) {
    let action = 'add';
    for (const span of this.children) {
        span.classList[action]('active');
        if (span === e.target) action = 'remove';
    }
});

/* TODO: Implement saving of rating*/ 