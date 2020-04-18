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
    this.ratingIndex = 0;
    this.rating = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    this.ratingMessage = '';
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
    io.sockets.emit('updateHostRating', {rating: data.rating});
}

Data.prototype.getUserArray = function(){
    return this.users;
}

Data.prototype.saveUserArray = function(array){
    this.name = array.name;
    this.gender = array.gender;
    this.seeking = array.seeking;
    this.phone = array.phone;
    let newUser = {gender: this.gender, name: this.name, seeking: this.seeking, phone: this.phone};
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

Data.prototype.savePhase = function(data){
    this.phase = data.phase;
}

Data.prototype.dummyResponse = function(checkedDate) {
    
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

const data = new Data();


io.on('connection', function(socket) {
    /* These are the things loaded upon load */
    socket.emit('updatePhase', {phase: data.phase});
    socket.emit('getUsers', {users: data.users, userIndex: data.userIndex});
    socket.emit('getImage', {userImagePath: data.userImagePath, index: data.userIndex});
    socket.emit('getBubbles', {userBubbles: data.userBubbles, userIndex: data.userIndex});
    socket.emit('hello', {userIndex: data.userIndex, users: data.users, picpath: data.userImageArray, userBubbles: data.userBubbles, eventName: data.eventName, eventTimeTo: data.eventTimeTo, eventTimeFrom: data.eventTimeFrom, eventMessage: data.eventMessage, eventDate: data.eventDate, eventEmail: data.eventEmail, eventLocation: data.eventLocation, rating: data.rating});

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
	// {names: "G", "T", "H", ID: 0}
	let tempArr = [];
	for (let i = 0; i < checkedDate.names.length; i++) {
	    for (let k = 0; k < data.users.length; k++) {
		if (checkedDate.names[i] == data.users[k].name) {
		    tempArr.push(k);
		}
	    }
	}
	for (let i = 0; i < tempArr.length; i++){
	    var toSave = {info: data.users[checkedDate.Id], image: data.userImageArray[checkedDate.Id, ID: tempArr[i]]};
	    data.userShareContactInfoResponse[tempArr[i]].push(toSave);
	}

	

	/*    for (let i = 0; i < data.users.length; i++) {
	      if (data.userShareContactInfoResponse[i].length < 3) {
	      
	      }
	  }
	      
	*/
	data.sentInfoInt += 1;
	console.log(data.sentInfoInt);
	if (data.userIndex == data.sentInfoInt) {
	    for (let i = 0; i < data.userIndex; i++) {
		for (let k = 0; k < data.userShareContactInfoResponse[i].length; k++)
		    if (data.userShareContactInfoResponse[i].info[k] == data.userShareContactInfoResponse[data.userShareContactInfoResponse[i].ID].info[k]){
			break;
		    }
		    else if (i == data.userShareContactInfoResponse.length && data.userShareContactInfoResponse[i].info[k] != data.userShareContactInfoResponse[data.userShareContactInfoResponse[i].ID].info[k]){
			data.userShareContactInfoResponse[i].splice(k, 1);
		    }
	    }
	    io.sockets.emit('responseDone', {gender: data.gender});
	}
    });
	     



    socket.on('userJoined', function(){
	io.sockets.emit('userHasJoined', {gender: data.gender, name: data.name, picpath: data.userImagePath, userBubbles: data.userBubbles});
    });
        
    socket.on('saveRating', function (rating, message, privID, fn) {
	console.log(rating);
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
