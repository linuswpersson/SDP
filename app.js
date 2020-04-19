/* jslint node: true */
/* eslint-env node */
'use strict';

// Require express, socket.io, and vue
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Pick arbitrary port for server
const port = 3000;
app.set('port', (process.env.PORT || port));

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue',
  express.static(path.join(__dirname, '/node_modules/vue/dist/')));
// Serve index.html directly as root page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
// Serve map.html as /map
app.get('/map', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/map.html'));
});
// Serve rating.html as /rating
app.get('/rating', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/user/html/rating.html'));
});

/* TODO: Save user data so (ex) data.users[0] pulls out all relevant info for that specific user. */
/* For now I will code it with only 1 user in consideration. */
function Data() {
    this.profiles = [];
    this.matches = [];

    this.gender = '';
    this.seeking = '';
    this.phone = '';
    this.name = '';
    this.email = '';
    this.ratingIndex = 0;
    this.rating = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    this.ratingMessage = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    this.users = [''];
    this.userIndex = 0;
    this.userImagePath = '../img/plus.png';
    this.userImageArray = [];
    this.userBubbles = [];
    this.femaleIndex= 10;

    this.userPreviousMatches = [];
    this.phase = 1;


    this.userShareContactInfo = Array(20);
    this.userShareContactInfoResponse = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    this.eventName = '';
    this.eventTimeTo = '';
    this.eventTimeFrom = '';
    this.eventMessage = '';
    this.eventDate = '';
    this.eventEmail = '';
    this.eventLocation = '';
    this.times = [];
    this.dateSpan = [];
    this.bilder= '';
    this.sentInfoInt = 0;

    this.dummyArray = [
	{name : 'Johan', picpath: 'https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Erik', picpath: 'https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80'},
	{name : 'Hjalmar', picpath: 'https://images.unsplash.com/photo-1508216404415-a35220fab80e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'},
	{name : 'Lars', picpath: 'https://images.unsplash.com/photo-1579038773867-044c48829161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'},
	{name : 'Åke', picpath: 'https://images.unsplash.com/photo-1479685894911-37e888d38f0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        {name : 'Tor', picpath: 'https://images.unsplash.com/photo-1546434946-3e8a5564945d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Valdermar', picpath: 'https://images.unsplash.com/photo-1573156770063-01139113dbdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Jan', picpath: 'https://images.unsplash.com/photo-1507864676385-e69c0ca53dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Olle', picpath: 'https://images.unsplash.com/photo-1544048242-e9b516820f97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Rolf', picpath: 'https://images.unsplash.com/photo-1552504462-0c6b5fef0925?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
        {name : 'Lina', picpath: 'https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Frida', picpath: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Mona Lisa', picpath: 'https://images.unsplash.com/photo-1423742774270-6884aac775fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Erika', picpath: 'https://images.unsplash.com/photo-1560768686-52887fe71392?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Linn', picpath: 'https://images.unsplash.com/photo-1521118224700-e216379d1ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Simone', picpath: 'https://images.unsplash.com/photo-1520989125854-939a8bdfa81e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Julia', picpath: 'https://images.unsplash.com/photo-1563306406-e66174fa3787?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Bennilina', picpath: 'https://images.unsplash.com/photo-1567850179641-1d2f8bec55cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Johanna', picpath: 'https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'},
	{name : 'Stina', picpath: 'https://images.unsplash.com/photo-1505685679686-2490cab6217d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
    ];

}

Data.prototype.saveBubbles = function(bubble){
    this.userBubbles = bubble.bubbleArray;
}

Data.prototype.saveImage = function(image){
    this.userImagePath = image.path;
    
}
/* Add rating to queue */
/* Hopefully there is a better looking way of saving these. */
Data.prototype.saveRating = function(rating, message, privID) {
    this.rating[privID].push(rating);
    this.ratingMessage[privID].push(message);
    io.sockets.emit('updateHostRating', {rating: data.rating, ratingMessage: data.ratingMessage});
}

Data.prototype.getUserArray = function(){
    return this.users;
}

Data.prototype.saveUserArray = function(array){
    this.name = array.name;
    this.gender = array.gender;
    this.seeking = array.seeking;
    this.phone = array.phone;
    this.email = array.email;
    let newUser = {gender: this.gender, name: this.name, seeking: this.seeking, phone: this.phone, email: this.email};
    this.users[this.userIndex] = newUser;

}

Data.prototype.saveHostInfo = function(data) {
    this.eventName = data.eventName;
    this.eventTimeTo = data.eventTimeTo;
    this.eventTimeFrom = data.eventTimeFrom;
    this.eventMessage = data.eventMessage;
    this.eventDate = data.eventDate;
    this.eventEmail = data.eventEmail;
    this.eventLocation = data.eventLocation;
}

Data.prototype.findID = function(list) {
    for (let i = 0; i < list.length; i++){
	if (typeof list[i] != 'undefined'){
	    if (list[i].ID != -1){
		return list[i].ID;
	    }
	}
    }
    return -1;
}

Data.prototype.findsendID = function(list) {
    let templist = [];
    for (let i = 0; i < list.length; i++){
	if (typeof list[i] != 'undefined'){
	    if (list[i].sendID != -1){
		templist.push(list[i].sendID);
	    }
	}
    }
    return templist;
}

Data.prototype.remove = function(list, sendID) {
    if (sendID != -1){
	for (let i = 0; i < list.length; i++) {
	    if (list[i].sendID == sendID) {
		if (i == 0) {
		    list.splice(0, 1);
		    return list;
		}
		list.splice(i, i);
		return list;
	    }
	}
    }
    

    return list;
}

Data.prototype.compareList = function(list2, ID) {
    if (typeof list2 != 'undefined') {
	for (let i = 0; i < list2.length; i++) {
		if (ID == list2[i].sendID) {
		    return true;
		}
	}
    }
    return false;
}    


Data.prototype.savePhase = function(data){
    this.phase = data.phase;
}

Data.prototype.dummyResponse = function(Id, Dummy) {

	let dummyMatch = {gender: '', name: '', seeking: '', phone: ''};
	let phoneNumbers = ['07071234567', '07129876544', '07555555555', '0735647923'];
	dummyMatch.name = Dummy;
	dummyMatch.phone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
	dummyMatch.email = Dummy + '@email.com';

	for(var i = 0; i < this.dummyArray.length; i++) {
	    if(Dummy == this.dummyArray[i].name){
		break;
	    }
	}
	var toSave = {info: dummyMatch, image: this.dummyArray[i].picpath, ID: -1, sendID: -1};
	data.userShareContactInfoResponse[Id].push(toSave);	
}



/*
    
	for (var element of checkedDate.names) {
	    if(Math.floor(Math.random() * 2) == 1) {
		for(var match of data.userPreviousMatches[checkedDate.Id]) {
		    if(match.name == element) {
			// just generating random contact info
			let matchContactInfo = {name: '', imgPath: '', phone: '', email: ''};
			let phoneNumbers = ['07071234567', '07129876544', '07555555555', '0735647923'];
			matchContactInfo.name = match.name;
			matchContactInfo.imgPath = match.imgPath;
			matchContactInfo.phone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
			matchContactInfo.email = match.name + '@email.com';
			data.userShareContactInfoResponse.push(matchContactInfo);
			
		    }
		}
	    }
	    data.userShareContactInfo[checkedDate.Id] = data.userShareContactInfoResponse;
    }

}

*/

const data = new Data();


io.on('connection', function(socket) {
    /* These are the things loaded upon load */
    socket.emit('updatePhase', {phase: data.phase});
    socket.emit('getUsers', {users: data.users, userIndex: data.userIndex});
    socket.emit('getImage', {userImagePath: data.userImagePath, index: data.userIndex});
    socket.emit('getBubbles', {userBubbles: data.userBubbles, userIndex: data.userIndex});
    socket.emit('hello', {userIndex: data.userIndex, users: data.users, picpath: data.userImageArray, userBubbles: data.userBubbles, eventName: data.eventName, eventTimeTo: data.eventTimeTo, eventTimeFrom: data.eventTimeFrom, eventMessage: data.eventMessage, eventDate: data.eventDate, eventEmail: data.eventEmail, eventLocation: data.eventLocation, rating: data.rating, ratingMessage: data.ratingMessage});

    /*-----------------------------------------------------------------*/
    // sending event info to user
    socket.emit('getEventInfo', {eventName: data.eventName, eventStartTime: data.eventTimeFrom, times: data.times, dateSpan: data.dateSpan, phase: data.phase});

    //sending previous matches to user
    socket.emit('getUserMatches', {matches: data.userPreviousMatches});

    //sending contact info of matches to user
    socket.emit('sendMatchContactInfo', {contact: data.userShareContactInfoResponse});
    /*-----------------------------------------------------------------*/

    /*--------------------------------*/
    //Table placement on user view
    socket.emit('recieveTablePlacement',{matches: data.matches, name: data.name});

    socket.on('sendCurrentMatches', function(bilder) {
	data.bilder = [];
	data.bilder = bilder;
    });

    socket.emit('sendPic', {info: data.bilder});

    /*--------------------------------*/

    /* Updates image whenever a new one is selected. */
    socket.on('loadImage', function(load){
	socket.emit('getImage', {userImagePath: data.userImagePath})
    });
    /* Stores user data and updates the local data. */
    socket.on('saveUsers', function(array){
	data.saveUserArray(array);
	socket.emit('getUsers',{ users: data.users, userIndex: data.userIndex});
    });
    /* Stores the selected image */
    socket.on('saveImage',function(image){
	data.saveImage(image);
    });

    socket.on('updateBubbles', function(bubble){
	data.userBubbles[data.userIndex] = bubble.bubbleArray;
	data.userIndex = data.userIndex + 1;
	data.userImageArray.push(data.userImagePath);
	data.userImagePath = '../img/plus.png';
    });

    socket.on('hostInfo', function(datar){
	data.saveHostInfo(datar);
    });
    
    socket.on('sendTablePlacement', function(matches){
	data.matches = matches;
    });

    socket.on('sendDateTimes', function(times){
	data.times = times.times;
	data.dateSpan = times.dateSpan;
	
    });

    socket.on('sendUserMatches', function(prevMatches){
	data.userPreviousMatches = prevMatches.prevMatches;
	data.phase = prevMatches.phase;
    });

    socket.on('isDone', function() {
	if (data.sentInfoInt == data.userIndex) {
	    io.sockets.emit('responseDoneLast', {gender: data.gender});
	}
    });
    
    socket.on('signal', function(currDate){
	data.savePhase(currDate);

	io.sockets.emit('signalFrom', {phase: data.phase});
    });

    socket.on('userShareContactInfo', function(checkedDate){
	let bool;
	let tempArr = [];
	for (let i = 0; i < checkedDate.names.length; i++) {
	    bool = true;
	    for (let k = 0; k < data.users.length; k++) {
		if (checkedDate.names[i] == data.users[k].name) {
		    bool = false;
		    tempArr.push(k);
		}
	    }
	    if(bool){
		data.dummyResponse(checkedDate.Id, checkedDate.names[i]);
	    }
	}
	for (let i = 0; i < tempArr.length; i++){                           
	    var toSave = {info: data.users[checkedDate.Id], image: data.userImageArray[checkedDate.Id], ID: tempArr[i], sendID: checkedDate.Id};
	    data.userShareContactInfoResponse[tempArr[i]].push(toSave);

	} 
	
	data.sentInfoInt += 1;
	if (data.userIndex == data.sentInfoInt) {
	    for (let i = 0; i < data.userIndex; i++){
		if (typeof data.userShareContactInfoResponse[i] != 'undefined') {
		    let ID = i;
		    let sentID = data.findsendID(data.userShareContactInfoResponse[i]);
		    if (typeof sentID[0] != 'undefined') {		    		    		
			for (let k = 0; k < sentID.length; k++) {
			    let test = data.compareList(data.userShareContactInfoResponse[sentID[k]], ID);
			    
			    if (!test) {
				data.userShareContactInfoResponse[i] = data.remove(data.userShareContactInfoResponse[i], sentID[k]);
			    }
			}
		    }
		}
	    }
	    io.sockets.emit('responseDone', {gender: data.gender});    
	}	
		
    });
      



    socket.on('userJoined', function(){
	io.sockets.emit('userHasJoined', {gender: data.gender, name: data.name, picpath: data.userImagePath, userBubbles: data.userBubbles});
    });
        
    socket.on('saveRating', function (rating, phase, privID, message, fn) {
	data.saveRating(rating, message, privID);

    });

    /*------------------------------------------------------------------*/


    
    /* None of the functions below serve any other purpose than for testing */
    
    socket.on('printUser', function(print){
	    print(data.users[data.userIndex].id);
	
    });

    socket.on('printImage', function(print){
	print(data.userImagePath);
    })

    /* A print function ensuring that things have been stored properly */
    socket.on('printALL', function(print){
	print(' rating ' + data.rating);	
    });

});
/* eslint-disable-next-line no-unused-vars */
const server = http.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port'));
});
