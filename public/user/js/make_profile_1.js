const vm = new Vue({
    el: '#input_section',
    data: {
	fullname : '',
	phone : '',
	gender : '',
	seeking : '',
	
	next : 'make_profile_2.html',
	back : 'user.html',
    },
    methods: {
	sendInfo: function() {    /* placeholder-function */
	    var dataArray = [];
	    dataArray.push(this.fullname);
	    dataArray.push(this.phone);
	    dataArray.push(this.gender);
	    dataArray.push(this.seeking);
	    console.log(dataArray.toString());
	    return dataArray;
	},

	nextClick: function() {
	    this.sendInfo();
	    document.location.href = this.next;
	},

	backClick: function() {
	    document.location.href = this.back;
	},
    },
})
