'use strict';
const socket = io();


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
    /* Loads the image upon load */
	created: function(){
	    socket.on('getImage', function(data){
		this.picpath = data.userImagePath;
	    }.bind(this));
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
	
	updatePic: function(item) { 
	    var oldPic = document.getElementById(this.selectedId);
	    oldPic.style.border = "2px solid white";
	    this.selectedId = item.buttonId;
	 //   this.picpath = item.path;
	    var savePic = item.path;
	    var newPic = document.getElementById(this.selectedId);
	    newPic.style.border = "2px solid green";
	    var nextButton = document.getElementById("nextButton");
	    nextButton.style.visibility = "visible";
	    /* Saves the image path globally */
	    socket.emit('saveImage', {
		path: savePic,
	    });
	    socket.emit('loadImage', function(print){
	    })
	    this.testInfo()
	},
	testInfo: function(){
	    /* Prints the globally saved image path */
	    socket.emit('printImage', function(data){
		console.log(data);
		this.picpath = data;
	    });
	},
	nextClick: function() {    
	    document.location.href = this.next;
	},

	backClick: function() {
	    document.location.href = this.back;
	},
    },
})
