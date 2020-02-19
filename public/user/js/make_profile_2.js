const vm = new Vue({
    el: '#picture_section',
    data: {
	picpath : '../img/plus.png',
	selectedId : 'p1', /* initialized to keep updatePic functional */
	
	next : 'make_profile_3.html',
	back : 'make_profile_1.html',

	picArray : [
	    {path : '../img/pp_test/stock1.jpeg', buttonId : 'p1'},
	    {path : '../img/pp_test/stock2.jpg', buttonId : 'p2'},
	    {path : '../img/pp_test/stock3.jpg', buttonId : 'p3'},
	    {path : '../img/pp_test/stock4.jpeg', buttonId : 'p4'},
	    {path : '../img/pp_test/stock5.jpg', buttonId : 'p5'},
	],
    },
    methods: {
	openModular: function() {
	    var modal = document.getElementById("modalWindow");
	    modal.style.display = "block";
	},

	closeModular: function() {
	    var modal = document.getElementById("modalWindow");
	    modal.style.display = "none";
	},
	
	updatePic: function(item) {  /* TODO: fix functional picture messaging */
	    var oldPic = document.getElementById(this.selectedId);
	    oldPic.style.border = "2px solid white";
	    this.selectedId = item.buttonId;
	    this.picpath = item.path;
	    var newPic = document.getElementById(this.selectedId);
	    newPic.style.border = "2px solid green";
	    var nextButton = document.getElementById("nextButton");
	    nextButton.style.visibility = "visible";
	},

	nextClick: function() {    /* TODO: fix functional picture messaging */
	    document.location.href = this.next;
	},

	backClick: function() {
	    document.location.href = this.back;
	},
    },
})
