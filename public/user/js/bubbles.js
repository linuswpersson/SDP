'use strict';
const socket = io();


const vm = new Vue({
    el: '#content',
    data: {
	next : 'user_home.html',
	back : 'make_profile_3.html',
	chosenBubbleArray : [],

	bubbleArray : [
	    {name : 'Music', selected : false},
	    {name : 'Art', selected : false},
	    {name : 'Sport', selected : false},
	    {name : 'Food', selected : false},
	    {name : 'Fashion', selected : false},
	    {name : 'Outdoors', selected : false},
	    {name : 'Travel', selected : false},
	    {name : 'Party', selected : false},
	    {name : 'Tv', selected : false},
	    {name : 'Excercise', selected : false},
	    {name : 'Lifestyle', selected : false},
	    {name : 'Video-games', selected : false},
	    {name : 'Movies', selected : false},
	    {name : 'Animales', selected : false},
	    {name : 'Drawing', selected : false},
	    {name : 'Coding', selected : false},
	    {name : 'Writing', selected : false},
	    {name : 'Reading', selected : false},
	    {name : 'Plants', selected : false},
	],
    },
    methods: {
	
	backClick: function() {
	    document.location.href = this.back;
	},

	nextClick: function() {
	    /* Saves the selected bubbles */
	    socket.emit('updateBubbles', {bubbleArray : this.chosenBubbleArray});
	    document.location.href = this.next;
	},

	bubbleClick: function(item) {
	    if(item.selected){
		var currbubble = document.getElementById(item.name);
		currbubble.style.border = "2px solid gray";
		for(let i = 0; i < this.bubbleArray.length; i++) {
		    if(item.name.localeCompare(this.bubbleArray[i].name) == 0) {
			this.bubbleArray[i].selected = false;
			break;
		    }
		}
		for(let ii = 0; ii < this.chosenBubbleArray.length; ii++){
		    if(item.name.localeCompare(this.chosenBubbleArray[ii].name) == 0) {
			this.chosenBubbleArray.splice(ii, 1);
			break;
		    }
		}
		item.selected = false;
	    }
	    else {
		var currbubble = document.getElementById(item.name);
		currbubble.style.border = "2px solid green";
		item.selected = true;
		this.chosenBubbleArray.push(item);
	    }
	},
    },
})
