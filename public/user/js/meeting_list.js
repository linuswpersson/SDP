const vm = new Vue({
    el: '#pageWrapper',

    data: {
	contactPage: 'contact_page.html'
    },

    methods: {
	nextClick: function() {
	     document.location.href = this.contactPage;
	},
    },
    
})
