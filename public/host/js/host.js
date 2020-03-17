'use strict'
const socket = io();


const vm = new Vue({
    el: '#eventInfo',
    data: {
	timeFrom: '',
	timeTo: '',
	name: '',
	email: '',
	location: '',
	date: '',
	message: '',
    },


    
});

var modal = document.getElementById("createEventModal");
var btn = document.getElementById("createEventClick");
var span = document.getElementsByClassName("close")[0];
var eventViewBtn = document.getElementById("eventViewClick");






eventViewBtn.onclick = function() {
    window.location = '/host/html/EventOverview.html';
}

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// JAVA SCRIPT FÖR FORM!
var x = document.getElementById("eventInfo");

//OBS HAR INTE LÖST hur man ska skicka infon!
/*var submitelement = document.createElement('input'); 
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);*/

function createBtn() {
    if (vm.name && vm.email && vm.location && vm.date && vm.message != ""){
    alert("Event created!" + vm.name);
	socket.emit('hostInfo', {
	    eventName: vm.name,
	    eventTimeTo: vm.timeTo,
	    eventTimeFrom: vm.timeFrom,
	    eventEmail: vm.email,
	    eventLocation: vm.location,
	    eventDate: vm.date,
	    eventMessage: vm.message,
	    
	});	
	modal.style.display = "none";
    }
    else {
	alert("Please in the form");
    }
}

